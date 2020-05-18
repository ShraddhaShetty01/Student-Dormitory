var mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
    roomnumber: Number,
    roomtype: String,
    roomcapacity: Number,
    roomavailable: Boolean,
    roomimage: String
   
});

module.exports =mongoose.model("Room",roomSchema);