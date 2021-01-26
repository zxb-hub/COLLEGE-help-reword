const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentName:String,
    sex:Boolean,
    college_id:String,
    major_id:String,
    class_id:String,
    userId:String,
    psw:String,
    english:Number,
    profession:Number,
}) 
module.exports= mongoose.model("student",studentSchema)