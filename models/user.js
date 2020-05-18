var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    // username:String,
    email:String,
    password:String,
    // enrollnumber: String,
    // phonenumber:Number
});

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);   