const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    college: String,
}) 

module.exports = mongoose.model("college",collegeSchema)