“Streams are Node’s best and most misunderstood idea.”
— Dominic Tarr

大家好，我是曲灵风，这段时间看node stream的东西，想通过stream做一玩意儿，最后搞了一个视频站的东西(手机排版没做好，电脑排版还可以)。

![视频站截图.png](http://upload-images.jianshu.io/upload_images/5648502-e76c6e2c1683d437.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[访问](http://106.15.231.221:9000/)
[源码位置](https://github.com/WenNingZhang/video_stream)

先声明一下，这里用到的技术有点多，因为本文是针对stream的，其他的东西会一笔带过，涉及到流的东西会详细。

上正文，想必大家都知道，使用流的两大优势是
1. 处理大量数据。
2. 组合代码，例如使用pipe。

这里的具体解释可以查看`参考资料`的 Node.js Streams: Everything you need to know。

既然stream可以处理大量数据，那么处理视频这样的文件就可以使用stream。

先看app.js
```js
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(require('./controllers'));

app.listen(port, function () {
	console.log('listen to port:' + port);
});
```
获取了一个应用程序实例app(相当于new一个应用程序实例)；
设置模板文件存放的目录；
设置模板引擎为`ejs`；
路由在`app.use(require('./controllers'))`设置；
最后监听端口。

具体程序应用框架的架构可以参考我的文章
 [通过express实现一个简单的MVC](http://www.jianshu.com/p/418355c316dc)

通过路由到达文件movie.js
```js
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res){
	
	var path = 'video/shanghaiTan.mp4';
	var stat = fs.statSync(path);
	var fileSize = stat.size;
	var range = req.headers.range;

	var parts = range.replace(/bytes=/, "").split("-")
	var start = parseInt(parts[0], 10);
	var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

	var chunksize = (end-start) + 1;
	var file = fs.createReadStream(path, {start, end})
	var head = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/mp4',
	}
	res.writeHead(206, head);
	file.pipe(res);
});

module.exports = router;
```
这里是stream主要应用的地方，通过使用stream，使得每次发送数据是一块一块的，而并非一下子把所有的数据发送的前端。

bootstrap请求视频默认是Content-Range的方式，这是种部分请求的方式，针对范围请求，响应会返回状态码为 206 Partial Content 的响应报文，见下图所示。
![Content-Range.png](http://upload-images.jianshu.io/upload_images/5648502-30b2b2109eb26202.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因为rander的格式是`Range: bytes = 0 - `，因此通过字符串的处理可以获取相应信息，从而构建响应头。
最后通过可读流的pipe方法写到可写流(response对象中)。

所有流都是事件（EventEmitter）的实例，因此可以监听事件。而pipe方法的实现原理是就是通过对`data`和`end`事件的监听获取数据的，其中pipe还利用了后压机制，是流比较好的实现方式。

其实为了做这个东西，着实是踩了不少坑，例如：
1. 访问服务器端口访问不成功，在知乎上问[问题](https://www.zhihu.com/question/64657512)。
2. `'Content-Type': 'video/mp4'`，这里的设置只会播放mp4中编码是`H.264`，其他编码视频可能不显示。
详细的[问题](http://blog.csdn.net/qq_16885135/article/details/54427532)，最后通过网上的一个Node依赖[实现](https://handbrake.fr/downloads.php)的。
3. bootstrap也是第一次使用，也踩了不少坑😢。
希望各位看官不要再掉坑里了，最后奖励自己一朵小红花🌹。

参考资料
>  [Node.js Streams: Everything you need to know](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)
>  [Video stream with Node.js and HTML5](https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6)
> [Basic use of Node.js streams](http://codewinds.com/blog/2013-08-02-streams-basics.html#for_additional_reading)
> [Node.js Streams by Example](https://medium.com/@chris_neave/node-js-streams-by-example-9019398a258)