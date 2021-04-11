const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        fname: { type: String, required: true, maxlength: 50 },
        lname: { type: String, required: true, maxlength: 50 },
        dateOfBirth: { type: Date },
        dateOfDeath: { type: Date }
    }
)
AuthorSchema
    .virtual('name')
    .get(function() {
        return this.fname + ' ' + this.lname
    })
AuthorSchema
    .virtual('lifespan')
    .get(function() {
        var life = this.dateOfDeath.getYear() - this.dateOfBirth.getYear()
        return life.toString()
    })
AuthorSchema
    .virtual('url')
    .get(function() {
        return '/catalog/author/' + this._id
    })

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author