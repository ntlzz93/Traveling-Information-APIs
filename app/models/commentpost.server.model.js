var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var CommentPostSchema = new Schema({
    IDPost : String,
    IDMemberProfile : String,
    Content : String,
    CommentPostTime: { type: Date, default: Date.now }
    
});



mongoose.model('CommentPost', CommentPostSchema);
