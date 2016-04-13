var port = 1337;

module.exports = {
	port: port,
	db: 'mongodb://localhost/todos',
	facebook: {
		clientID: '1388823167810501',
		clientSecret: 'd2ad2f8d8629d5efab405cfe84ae4e12',
		callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
		clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
		callbackURL: 'http://localhost:'+ port +'/oauth/twitter/callback'
	}
};