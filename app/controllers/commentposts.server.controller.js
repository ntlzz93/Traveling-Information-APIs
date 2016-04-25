
var CommentPostModel = require('mongoose').model('CommentPost'),
        passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        message = 'Something went wrong';
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.create = function (req, res, next) {
    var commentpost = new CommentPostModel(req.body);
    commentpost.save(function (err) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: commentpost,
                message: "created successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


exports.list = function (req, res, next) {
    CommentPostModel.find({}, function (err, commentposts) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: commentposts,
                message: "successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


exports.read = function (req, res) {
    var data = {
        value: req.commentpost,
        message: "successfully",
        status: 1
    };
    res.json(data);
};

/* find with id commentpost */
exports.commentpostByID = function (req, res, next, id) {
    CommentPostModel.findOne({
        _id: id
    },
            function (err, commentpost) {
                if (err) {
                    console.log(getErrorMessage(err));
                    return next(err);
                } else {
                    req.commentpost = commentpost;
                    next();
                }
            }
    );
};

exports.readIdPost = function (req, res) {
    var data = {
        value: req.commentpost,
        message: "successfully",
        status: 1
    };
    res.json(data);
};

/* find with id post */
exports.commentpostByIdPost = function (req, res, next) {
    CommentPostModel.find({
        IDPost: req.params.postId
    },
            function (err, commentpost) {
                if (err) {
                    console.log(getErrorMessage(err));
                    return next(err);
                } else {
                    req.commentpost = commentpost;
                    next();
                }
            });
};

exports.readIdMember = function (req, res) {
    var data = {
        value: req.commentpost,
        message: "successfully",
        status: 1
    };
    res.json(data);
};
/* find with id user */
exports.commentpostByIdMemeberProfile = function (req, res, next) {
    CommentPostModel.find({
        IDMemberProfile: req.params.userId
    },
            function (err, commentpost) {
                if (err) {
                    console.log(getErrorMessage(err));
                    return next(err);
                } else {
                    req.commentpost = commentpost;
                    next();
                }
            });
};


exports.update = function (req, res, next) {
    CommentPostModel.findByIdAndUpdate(req.params.commentpostId, req.body, function (err, commentpost) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                message: "updated successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.delete = function (req, res, next) {
    req.commentpost.remove(function (err) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                message: "deleted successfully",
                status: 1
            };
            res.json(data);
        }
    });
};



