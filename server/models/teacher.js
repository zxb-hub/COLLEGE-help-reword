const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username:String,
    userId:String,
    psw:String,
    college_id:String,
    major_id:String,
    level:String
}) 
module.exports= mongoose.model("teacher",teacherSchema)