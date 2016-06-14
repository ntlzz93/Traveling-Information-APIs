var MemberProfile = require('mongoose').model('MemberProfile'),
        passport = require('passport'),
        crypto = require('crypto');

var jwt = require('jsonwebtoken');
// var app  = express();
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderLogin = function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Log-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderRegister = function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.register = function (req, res, next) {
    if (!req.user) {
        var user = new MemberProfile(req.body);
        var message = null;
        user.Provider = 'local';
        user.LoginName = req.body.username;
        user.Password = req.body.password;
        user.Email = req.body.email;
        user.FirstName = req.body.name;

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/register');
            }

            req.login(user, function (err) {
                if (err)
                    return next(err);
                var data = {
                    message: "register successfullly",
                    status: 1
                };
                res.json(data);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.saveOAuthUserProfile = function (req, profile, done) {
    MemberProfile.findOne({
        Provider: profile.Provider,
        ProviderId: profile.ProviderId
    },
            function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    console.log(profile);
                    if (!user) {
                        var possibleUsername = profile.FirstName || ((profile.ProviderData.email) ? profile.ProviderData.email.split('@')[0] : '');
                        MemberProfile.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                            profile.FirstName = availableUsername;
                            profile.accessToken = profile.ProviderData.accessToken;
                            user = new MemberProfile(profile);

                            user.save(function (err) {
                                if (err) {
                                    var message = getErrorMessage(err);
                                    req.flash('error', message);
                                    return req.redirect('/register');
                                }

                                return done(err, user);
                            });
                        });
                    } else {
                        return done(err, user);
                    }
                }
            }
    );
};



exports.create = function (req, res, next) {
    var user = new MemberProfile(req.body);
    user.save(function (err) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: user,
                message: "created user successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.list = function (req, res, next) {
    MemberProfile.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            var data = {
                value: users,
                message: "successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.read = function (req, res) {
    var data = {
        value: req.user,
        message: "successfully",
        status: 1
    };
    res.json(data);
};

exports.userByID = function (req, res, next, id) {
    MemberProfile.findOne({
        _id: id
    },
            function (err, user) {
                if (err) {
                    console.log(getErrorMessage(err));
                    return next(err);
                } else {
                    req.user = user;
                    next();
                }
            }
    );
};

exports.update = function (req, res, next) {
    MemberProfile.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: user,
                message: "updated user successfully",
                status: 1
            };
            res.json(data);
        }
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            console.log(getErrorMessage(err));
            return next(err);
        } else {
            var data = {
                value: req.user,
                message: "created user successfully",
                status: 1
            };
            res.json(data);
        }
    });
};


// Android

// TODO: route to authenticate a user (POST http://localhost:1337/api/signin)

exports.authenAdnroid = function(req,res){
    console.log(req.body.username);
    // find the user
    MemberProfile.findOne({
        LoginName: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
                var password = req.body.password;
                console.log(password);
                var md5 = crypto.createHash('md5');
                password = md5.update(password).digest('hex');

                console.log(password);
            // check if password matches
            if (user.Password != password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, 'loint', {
                    expiresIn: '30d' // expires in 30 days
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    user : user,
                    token: token
                });

                jwt.verify(token, 'loint', function(err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        console.log(req.decoded._doc);
                    }
                });
            }

        }

    });
}

// TODO: route to register a user (POST http://localhost:1337/api/signup)
exports.registerAdnroid = function(req,res){
    var userModel = new MemberProfile();
    var message = null;
    userModel.Provider = 'local';
    userModel.LoginName = req.body.username;
    userModel.Password = req.body.password;
    userModel.Email = req.body.email;

    userModel.save(function(err, user) {
            res.json({
                type: true,
                data: user,
            });
        });
}
// TODO: route middleware to verify a token

// var verifyToken = function(req,res,next){
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log(token);
//     // decode token
//     if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token, 'loint', function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// }
exports.homeAndroid = function(req,res){
    res.json({ message: 'Welcome to the android API on earth!' });
}

exports.getUserAndroid = function(req,res){

    MemberProfile.find({}, function(err, users) {
        if(err)  throw err;
        res.json(users);
    });
}
