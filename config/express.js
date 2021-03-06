var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session');
var morgan      = require('morgan');
var jwt = require('jsonwebtoken');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(morgan('dev'));

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/index.server.routes.js')(app);
//	require('../app/routes/users.server.routes.js')(app);
        require('../app/routes/memberprofiles.server.routes.js')(app);
        require('../app/routes/posts.server.routes.js')(app);
        require('../app/routes/postdetails.server.routes.js')(app);
        require('../app/routes/commentposts.server.routes.js')(app);
        
	// app.use(express.static('./public'));
	app.use(express.static('public'));

	return app;
};