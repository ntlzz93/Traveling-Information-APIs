var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var PostDetailSchema = new Schema({
    IDPost : String,
    ImageURL : String,
    Caption : String,
    Like : Number
});



mongoose.model('PostDetail', PostDetailSchema);

