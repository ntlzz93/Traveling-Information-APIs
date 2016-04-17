var postController = require('../../app/controllers/posts.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/post').post(postController.create).get(postController.list);

	app.route('/post/:postId').get(postController.read).put(postController.update).delete(postController.delete);

	app.param('postId', postController.postByID);

};


