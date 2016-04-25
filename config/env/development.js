var port = 1337;
var host = "127.0.0.1";

module.exports = {
    host: host,
    port: port,
    db: 'mongodb://localhost/travincity',
    facebook: {
        clientID: '1781528908733909',
        clientSecret: 'a21da21f705b1d68d24b5c1a72d20279',
        callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
        clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
        callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
    }
};