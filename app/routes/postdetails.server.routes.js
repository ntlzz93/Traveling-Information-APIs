var postDetailController = require('../../app/controllers/postdetails.server.controller'),
        passport = require('passport');

module.exports = function (app) {
    app.route('/postdetail').post(postDetailController.create).get(postDetailController.list);

    app.route('/postdetail/:postdetailId').get(postDetailController.read).put(postDetailController.update).delete(postDetailController.delete);
    
    app.route('/postdetail/postId/:postId').get(postDetailController.read);
    
    app.param('postdetailId', postDetailController.postDetailByID);
    
    app.param('postId', postDetailController.postDetailByIDPost);

};



