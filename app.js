var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//告诉express我们这次把模板放到views目录下面
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(require('./controllers'));

app.listen(port, function () {
	console.log('listen to port:' + port);
});
