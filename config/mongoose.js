var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

//	require('../app/models/user.server.model');
        require('../app/models/memberprofile.server.model');
        require('../app/models/post.server.model');
        require('../app/models/postdetail.server.model');
        require('../app/models/commentpost.server.model'); 
	return db;
};