var postController = require('../../app/controllers/posts.server.controller'),
        passport = require('passport');

module.exports = function (app) {
    app.route('/post').post(postController.create).get(postController.list);

    app.route('/post/:postId').get(postController.read).put(postController.update).delete(postController.delete);

    app.route('/post/memberId/:memberId').get(postController.read);

    app.route('/post/like/:postIdLike').put(postController.like);

    app.route('/post/interest/:postIdInterest').put(postController.subcribe);
    
    app.route('/post/findByKeyWord/:input').get(postController.FindByKeyWord);
    
    app.route('/post/comment/:postIdComment').put(postController.comment);

    app.param('postId', postController.postByID);

    app.param('memberId', postController.postByIdMemberProfile);

};


