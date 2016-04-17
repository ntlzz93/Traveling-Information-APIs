var PostDetailModel = require('mongoose').model('PostDetail'),
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
    var postdetail = new PostDetailModel(req.body);
    postdetail.save(function (err) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: postdetail,
                message: "created successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

/* List all */
exports.list = function (req, res, next) {
    PostDetailModel.find({}, function (err, postdetail) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: postdetail,
                message: "successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


exports.read = function (req, res) {
    var data = {
        value: req.postdetail,
        message: "successfully",
        status: 1
    };
    res.json(data);
};

/* find postdetail with id postdetail */
exports.postDetailByID = function (req, res, next, id) {
    PostDetailModel.findOne({
        _id: id
    },
            function (err, postdetail) {
                if (err) {
                    console.log(this.getErrorMessage(err));
                    return next(err);
                } else {
                    req.postdetail = postdetail;
                    next();
                }
            }
    );
};

/* find postdetail with id post */
exports.postDetailByIDPost = function (req, res, next) {
    PostDetailModel.find({IDPost: req.params.postId}, function (err, postdetail) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            res.json(postdetail);
        }
    });
};

exports.update = function (req, res, next) {
    PostDetailModel.findByIdAndUpdate(req.params.postdetailId, req.body, function (err, postdetail) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: postdetail,
                message: "updated successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.delete = function (req, res, next) {
    req.postdetail.remove(function (err) {
        if (err) {
            console.log(this.getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: req.postdetail,
                message: "deleted successfully",
                status: 1
            };
            res.json(data);
        }
    });
};



