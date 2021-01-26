const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const classSchema = new Schema({
    college:String,
    major:String,
    class_id:String,
    class:String,
}) 
module.exports = mongoose.model("class",classSchema )