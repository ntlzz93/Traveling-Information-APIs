var port = 47345;
var host = "103.237.98.230";
module.exports = {
	host:host,
	port: port,
	db: 'mongodb://ntlzz:123456@ds047345.mlab.com:47345/travincity',
	facebook: {
		clientID: '100744463671984',
		clientSecret: 'b11d45470a90e74811750b7245deba63',
		callbackURL: 'https://floating-brushlands-27811.herokuapp.com/'+ port +'/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
		clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
		callbackURL: 'http://localhost:'+ port +'/oauth/twitter/callback'
	}
};

