var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var CommentPostSchema = new Schema({
    IDPost : String,
    IDMemberProfile : String,
    Content : String,
    CommentPostTime: Date
    
});



mongoose.model('CommentPost', CommentPostSchema);
