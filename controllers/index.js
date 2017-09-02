var express = require('express');
var router = express.Router();

router.use('/movie', require('./movie'));
router.use('/about', require('./about'));

router.get('/', function(req, res){
	res.render('pages/index', {title: 'Hey', message: 'Hello there!'});
});

module.exports = router;