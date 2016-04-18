var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var MemberProfileSchema = new Schema({
    LoginName :{
        type : String,
        trim : true,
        unique : true
    },
    Password : String,
    FirstName : String,
    LastName : String,
    Birthday : Date,
    Gender : Number,
    Address : String,
    ProfileID : String,
    ProfileURL : String,
    AvatarImageURL : String,
    CoverImageURL : String,
    ActiveTime : Date,
    Email : {
        type : String,
        trim : true,
        unique : true
    },
    Provider : String,
    ProviderId : String,
    Role : Number,
    accessToken : String,
    providerData: {},
    todos: {}
});

MemberProfileSchema.pre('save', 
	function(next) {
		if (this.Password) {
			var md5 = crypto.createHash('md5');
			this.Password = md5.update(this.Password).digest('hex');
		}

		next();
	}
);

MemberProfileSchema.methods.authenticate = function(Password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(Password).digest('hex');

	return this.Password === md5;
};

MemberProfileSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{LoginName: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};

mongoose.model('MemberProfile', MemberProfileSchema);