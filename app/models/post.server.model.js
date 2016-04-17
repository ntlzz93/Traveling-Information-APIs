var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
    IDMemberProfile : String,
    Title : String,
    Content : String,
    PostTime : Date,
    Longitude : String,
    Latitude: String,
    Like : Number,
    Interested : Number,
    Status : Number
    
});



mongoose.model('Post', PostSchema);