const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Name:String,
    userId:String,
    psw:String,
}) 
module.exports= mongoose.model("adminuse",adminSchema)