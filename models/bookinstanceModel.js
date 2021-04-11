const mongoose = require('mongoose')
const Book = require('./bookModel')
const Schema = mongoose.Schema;
const { DataTime } = require('luxon')

const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    dueBack: {type: Date, default: Date.now}
  }
)

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id
})

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.dueBack).toLocaleString(DateTime.DATE_MED);
});

//Export model
const BookInstance = mongoose.model('BookInstance', BookInstanceSchema);
module.exports = BookInstance