import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/testfmi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  books: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Book' }]
});

userSchema.methods.sayHi = function () {
  return 'Hello!';
}

const userBook = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
});

export const userModel = mongoose.model('User', userSchema);
export const bookModel = mongoose.model('Book', userBook);