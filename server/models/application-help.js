const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const helpSchema = new Schema({
    userId:String,
    studentName:String,
    desc:String,
    college_id:String,
    major_id:String,
    stateClass:String,
    stateMajor:String,
    stateCollege:String,
}) 
module.exports = mongoose.model("help",helpSchema )