process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
        mongoose = require('./config/mongoose'),
        express = require('./config/express'),
        passport = require('./config/passport');

var jwt = require('jsonwebtoken');


var db = mongoose(),
        app = express(),
        passport = passport();

app.listen(config.port, function(){
    var host = config.host;
    var port = config.port;
});

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at' + config.host + ' ' + +config.port);
//console.log(process.env.NODE_ENV + ' server running at https://travelincity-api.rhcloud.com/' + config.port);