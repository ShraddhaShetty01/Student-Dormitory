var mongoose = require("mongoose");
var Room = require("./rooms");
//JSON scheme in which data will be processed
var dormSchema = new mongoose.Schema({
    name: String,
    image: String,
    details: String,
    Room : [{
        roomnumber: Number,
        roomtype: String,
        roomcapacity: Number,
        roomavailable: Boolean,
        roomimage: String
        }]    
});

//add MongoDB processing methods and sends back " mongoose.model("dorm",dormSchema);" when ./models/dorm is called in app.js
module.exports = mongoose.model("Dorm",dormSchema);