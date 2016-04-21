var mongoose = require('mongoose'),
        crypto = require('crypto'),
        Schema = mongoose.Schema;

var PostSchema = new Schema({
    IDMemberProfile: String,
    Title: String,
    Content: String,
    PostTime: {type: Date, default: Date.now},
    Longitude: String,
    Latitude: String,
    Like: {
        NumberLike: Number,
        PeopleLike: [{id : String, flag : Boolean}]
    },
    Interested: Number,
    Status: Number

});



mongoose.model('Post', PostSchema);