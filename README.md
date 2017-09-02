“Streams are Node’s best and most misunderstood idea.”
— Dominic Tarr

大家好，我是曲灵风，这段时间一直研究node stream的东西，想通过stream做一东西，最后搞了一个类似于视频站的东西(手机排版没做好，电脑排版还可以)。

[访问](http://106.15.231.221:9000/)
[源码位置](https://github.com/WenNingZhang/video_stream)

先声明一下，这里用到的技术有点多，因为本文是针对stream的，其他的东西会一笔带过，涉及到流的东西会详细。

上正文，想必大家都知道，使用流的两大优势是
1. 处理大量数据。
2. 组合代码，例如使用pipe。

这里的具体解释可以查看`参考资料`的 Node.js Streams: Everything you need to know。




参考资料
>  [Node.js Streams: Everything you need to know](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)
>  [Video stream with Node.js and HTML5](https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6)
> [Basic use of Node.js streams](http://codewinds.com/blog/2013-08-02-streams-basics.html#for_additional_reading)
> [Node.js Streams by Example](https://medium.com/@chris_neave/node-js-streams-by-example-9019398a258)

把文档写好。

学之动作者为之模仿,学之套路者为之创造。

这里需要用到stream,这里通过使用stream,使得每次发送数据是一块一块的,而并非一下子把所有的数据发送

的前端。


这里通过`206`说明请求是部分请求,其中浏览器会重新把要请求chunk的开始字段传回来,服务器这时根据请求

重新拿值。# video_stream


把文档写好。

学之动作者为之模仿,学之套路者为之创造。

这里需要用到stream,这里通过使用stream,使得每次发送数据是一块一块的,而并非一下子把所有的数据发送

的前端。


这里通过`206`说明请求是部分请求,其中浏览器会重新把要请求chunk的开始字段传回来,服务器这时根据请求

重新拿值。# video_stream
