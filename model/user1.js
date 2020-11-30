var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");




const Schema = mongoose.Schema;
    var UserSchema = new mongoose.Schema({
        username: {type: String},
        password: {type :String},
    });
UserSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model("credentials",UserSchema,"credentials");