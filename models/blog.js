let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    snippet: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required:true
    },
}, { timestamps: true })

let Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog