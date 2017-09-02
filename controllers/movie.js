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