const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const majorSchema = new Schema({
    major:String,
    major_id:String,
    college:String,
}) 
module.exports= mongoose.model("major",majorSchema)