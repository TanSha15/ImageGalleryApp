const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    imageURL : {
        type : String
    },
    originalName : {
        type : String
    },
    mimeType : {
        type : String
    },
    size : {
        type : String
    }
},{
    timestamps : true
})

module.exports = mongoose.model("gallery",imageSchema);