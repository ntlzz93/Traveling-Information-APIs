var CommentPostController = require('../../app/controllers/commentposts.server.controller'),
        passport = require('passport');

module.exports = function (app) {
    app.route('/commentpost').post(CommentPostController.create).get(CommentPostController.list);

    app.route('/commentpost/:commentpostId').get(CommentPostController.read).put(CommentPostController.update).delete(CommentPostController.delete);

    app.route('/commentpost/postId/:postId').get(CommentPostController.readIdPost);

    app.route('/commentpost/memberId/:userId').get(CommentPostController.readIdMember);

    app.param('commentpostId', CommentPostController.commentpostByID);
    
    app.param('postId',CommentPostController.commentpostByIdPost);
    
    app.param('userId',CommentPostController.commentpostByIdMemeberProfile);

};

