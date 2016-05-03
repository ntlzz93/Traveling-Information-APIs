
var PostModel = require('mongoose').model('Post'),
        passport = require('passport');
var request = require("request");
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
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: post,
                message: "created successfully",
                status: 1
            };
            res.json(data);
        }
    });
};
/* List post accepted */
exports.list = function (req, res, next) {
    PostModel.find({Status: 1}, function (err, posts) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: posts,
                message: "successfully",
                status: 1
            };
            res.json(data);
        }
    });
};
exports.read = function (req, res) {
    var data = {
        value: req.post,
        message: "successfully",
        status: 1
    };
    res.json(data);
};
exports.postByID = function (req, res, next, id) {
    PostModel.findOne({
        _id: id
    },
            function (err, post) {
                if (err) {

                    return next(err);
                } else {
                    req.post = post;
                    next();
                }
            }
    );
};
/* TimeLine */
exports.postByIdMemberProfile = function (req, res, next, IdMemberProfile) {
    PostModel.findOne({IDMemberProfile: IdMemberProfile}, function (err, post) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            req.post = post;
            next();
        }
    });
};
exports.update = function (req, res, next) {
    PostModel.findByIdAndUpdate(req.post.id, req.body, function (err, post) {
        if (err) {
            console.log(getErrorMessage(err));
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
            console.log(getErrorMessage(err));
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

exports.like = function (req, res, next) {
    PostModel.findByIdAndUpdate(req.params.postIdLike, req.body, {new : true}, function (err, post) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var numberPeopleLike = post.Like.PeopleLike.length;
            var currentUserID = req.body.CurrentUserID;
//            console.log(numberPeopleLike);
            if (numberPeopleLike === 0) {
                post.Like.NumberLike = 0;
                post.Like.PeopleLike.push({id: currentUserID, flag: true});
                post.Like.NumberLike += 1;
                var data = {
                    value: post,
                    message: "Like",
                    status: 1
                };
                res.json(data);
                post.save(data);
                next();
            } else {
                // post like != null
                // 
                // 
                var existID = false;
                var userId = null;
                var indexToRemove = 0;
                var numberToRemove = 1;

                for (var i = 0; i < numberPeopleLike; i++) {
                    if (post.Like.PeopleLike[i].id === currentUserID) {
                        existID = true;
                        userId = currentUserID;
                        indexToRemove = i;
                    }
                }
                if (existID !== true) {
                    // never exist
                    post.Like.PeopleLike.push({id: currentUserID, flag: true});
                    post.Like.NumberLike += 1;
                    var data = {
                        value: post,
                        message: "Like",
                        status: 1
                    };
                    res.json(data);
                    post.save(data);
                    next();
                } else {
                    post.Like.PeopleLike.splice(indexToRemove, numberToRemove);
                    post.Like.NumberLike -= 1;
                    var data = {
                        value: post,
                        message: "Undo Like",
                        status: 0
                    };
                    res.json(data);
                    post.save(data);
                    next();
                }
            }

        }
    });
};

exports.subcribe = function (req, res, next) {
    PostModel.findByIdAndUpdate(req.params.postIdInterest, req.body, {new : true}, function (err, post) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var numberPeopleInterest = post.Interested.PeopleInterest.length;
            var currentUserID = req.body.CurrentUserID;
            if (numberPeopleInterest === 0) {
                post.Interested.NumberInterest = 0;
                post.Interested.PeopleInterest.push({id: currentUserID, flag: true});
                post.Interested.NumberInterest += 1;
                var data = {
                    value: post,
                    message: "Interested",
                    status: 1
                };
                res.json(data);
                post.save(data);
                next();
            } else {
                // post wishlist != null
                // 
                // 
                var existID = false;
                var userId = null;
                var indexToRemove = 0;
                var numberToRemove = 1;

                for (var i = 0; i < numberPeopleInterest; i++) {
                    if (post.Interested.PeopleInterest[i].id === currentUserID) {
                        existID = true;
                        userId = currentUserID;
                        indexToRemove = i;
                    }
                }
                if (existID !== true) {
                    // never exist
                    post.Interested.PeopleInterest.push({id: currentUserID, flag: true});
                    post.Interested.NumberInterest += 1;
                    var data = {
                        value: post,
                        message: "Interested",
                        status: 1
                    };
                    res.json(data);
                    post.save(data);
                    next();
                } else {
                    post.Interested.PeopleInterest.splice(indexToRemove, numberToRemove);
                    post.Interested.NumberInterest -= 1;
                    var data = {
                        value: post,
                        message: "Undo Interested",
                        status: 0
                    };
                    res.json(data);
                    post.save(data);
                    next();
                }
            }

        }
    });
};

exports.comment = function (req, res, next) {
    PostModel.findByIdAndUpdate(req.params.postIdComment, res.body, function (err, post) {
        if (err) {
            return next(err);
        } else {
            var userComment = req.body.IdUserComment;
            var ContentComment = req.body.Content;

            post.Comment.CommentContent.push({IdUserComment: userComment, Content: ContentComment});
            post.Comment.NumberComment += 1;
            var data = {
                value: post,
                message: "Comment",
                status: 1
            };
            res.json(data);
            post.save(data);
            next();
        }
    });
};

exports.FindByKeyWord = function (req, res, next) {

    var API_KEY = "AIzaSyBNXabrkjbjtTFT03iHZxWpxDeikEGGEKg";
    var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    var inputSearch = req.params.input;
    var address = inputSearch.toString();

    var url = BASE_URL + address + "&key=" + API_KEY;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = body.replace(/(\r\n|\n|\r)/gm,"");
            result = result.replace(/\\/g, "");

            console.log(result);
            console.log(typeof(result));
            result = JSON.parse(result);
            // var obj = JSON.parse(body);
            console.log(result);
            console.log(typeof(result));

            var lat = result.results[0].geometry.location.lat;
            var lng = result.results[0].geometry.location.lng;

            console.log("lat "+lat);
            console.log("lng "+lng);
            PostModel.find({
                        "Location.Longitude": lng,
                        "Location.Latitude": lat
               },
                       function (err, result) {
                                if (err) {
                                        return next(err);
                                    } else {
                                        if(result.length !== 0){
                                            var data = {
                                                value: result,
                                                message: "Search by key word",
                                                status: 1
                                            };
                                            res.json(data);
                                        }
                                       else{
                                            var data = {
                                                message: "null",
                                                status: 0
                                            };
                                            res.json(data);
                                        }
                                    }
                           }
               );

            // res.json(result);
        }
        else {
            var result = {
                message: "Can't find",
                status: 0
            };
            res.json(result);
        }
    });
};



