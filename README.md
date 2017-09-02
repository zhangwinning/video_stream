通过node stream 生成网页视频。
“Streams are Node’s best and most misunderstood idea.”
— Dominic Tarr

大家好，我是曲灵风，这段时间一直研究node stream的东西，感觉该看的都看了，想通过流做一点东西，想必大家都知道，使用流的两大优势是1. 


参考资料

[Node.js Streams: Everything you need to know](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)
[Video stream with Node.js and HTML5](https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6)

[Basic use of Node.js streams](http://codewinds.com/blog/2013-08-02-streams-basics.html#for_additional_reading)

[Node.js Streams by Example](https://medium.com/@chris_neave/node-js-streams-by-example-9019398a258)

把文档写好。

学之动作者为之模仿,学之套路者为之创造。

这里需要用到stream,这里通过使用stream,使得每次发送数据是一块一块的,而并非一下子把所有的数据发送

的前端。


这里通过`206`说明请求是部分请求,其中浏览器会重新把要请求chunk的开始字段传回来,服务器这时根据请求

重新拿值。# video_stream
