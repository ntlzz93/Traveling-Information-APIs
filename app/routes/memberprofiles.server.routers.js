var memberprofiles = require('../../app/controllers/memberprofiles.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/member').post(memberprofiles.create).get(memberprofiles.list);

	app.route('/member/:memberId').get(memberprofiles.read).put(memberprofiles.update).delete(memberprofiles.delete);

	app.param('memberId', memberprofiles.userByID);

	app.route('/register')
		.get(memberprofiles.renderRegister)
		.post(memberprofiles.register);

	app.route('/login')
		.get(memberprofiles.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.get('/logout', memberprofiles.logout);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope:['email']
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/login',
		successRedirect: '/',
		scope:['email']
	}));

	app.get('/oauth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/login'
	}));

	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/login',
		successRedirect: '/'
	}));
};
