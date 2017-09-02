var fs = require('fs');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//告诉express我们这次把模板放到views目录下面
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('pages/index', {title: 'Hey', message: 'Hello there!'});
});

// about page 
app.get('/movieA', function(req, res) {
	//这里读取movieA的视频
	const path = 'video/shanghaiTan.mp4';
	const stat = fs.statSync(path);
	const fileSize = stat.size;
	const range = req.headers.range;
	console.log('########', range);
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
		console.log(start, end);
		const chunksize = (end-start) + 1;
		const file = fs.createReadStream(path, {start, end})
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		}
		console.log('*****', head);
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(200, head)
		fs.createReadStream(path).pipe(res)
	}
});

app.listen(port, function () {
	console.log('listen to port:' + port);
});
