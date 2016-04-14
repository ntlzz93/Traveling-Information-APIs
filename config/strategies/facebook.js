var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
//	users = require('../../app/controllers/users.server.controller');
        users = require('../../app/controllers/memberprofiles.server.controller');

module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		var providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;
                
		var providerUserProfile = {
			FirstName: profile.name.familyName,
                        LastName: profile.name.givenName,
			Email: profile.emails.value,
                        AvatarImageURL: profile.photos.value,
			Provider: 'facebook',
                        ProviderId: profile.id,
			ProviderData: providerData
		};

		users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};