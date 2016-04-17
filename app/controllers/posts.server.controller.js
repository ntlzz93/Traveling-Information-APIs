
var PostModel = require('mongoose').model('Post'),
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
    var post = new PostModel(req.body);
    post.save(function (err) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            res.json(post);
        }
    });
};

/* List post accepted */
exports.list = function (req, res, next) {
    PostModel.find({Status: 1}, function (err, posts) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: posts,
                message: "created successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


exports.read = function (req, res) {
    var data = {
        value: req.post,
        message: "created successfully",
        status: 1
    };
    res.json(data);
};

/* TimeLine */
exports.postByID = function (req, res, next, id) {
    PostModel.findOne({
        _id: id
    },
            function (err, post) {
                if (err) {
                    console.log(this.getErrorMessage(err));
                    return next(err);
                } else {
                    req.post = post;
                    next();
                }
            }
    );
};

exports.update = function (req, res, next) {
    PostModel.findByIdAndUpdate(req.post.id, req.body, function (err, post) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: post,
                message: "updated successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.delete = function (req, res, next) {
    req.post.remove(function (err) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: req.post,
                message: "deleted successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


