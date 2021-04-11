const mongoose = require('mongoose')
const Author = require('./authorModel')
const Schema = mongoose.Schema

const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        // author is reference to author object model
        author: { type: Schema.Types.ObjectId, ref:'Author', required: true },
        summary: { type: String },
        isbn: { type: String, required: true },
        genre: [{ type: Schema.Types.ObjectId, ref: 'Genre'}]
    }
)

BookSchema
    .virtual('url')
    .get(function() {
        return 'catalog/book/' + this._id
    })

const Book = mongoose.model('Book', BookSchema)
module.exports = Book