var MemberProfile = require('mongoose').model('MemberProfile'),
        passport = require('passport');

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
                                    var message = this.getErrorMessage(err);
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
            console.log(this.getErrorMessage(err));
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
        message: "created user successfully",
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
                    console.log(this.getErrorMessage(err));
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
            console.log(this.getErrorMessage(err));
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
            console.log(this.getErrorMessage(err));
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


