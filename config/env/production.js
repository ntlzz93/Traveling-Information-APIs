var port = 80;
var host = "103.237.98.230";
module.exports = {
	host:host,
	port: port,
	db: 'mongodb://ntlzz:123456@ds047345.mlab.com:47345/travincity',
	facebook: {
		clientID: '249534838730582',
		clientSecret: '09ada79044254f7136bd86e8c364beb2',
		callbackURL: 'http://103.237.98.230/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
		clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
		callbackURL: 'http://localhost:'+ port +'/oauth/twitter/callback'
	}
};

