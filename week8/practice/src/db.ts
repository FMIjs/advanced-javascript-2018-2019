import * as mongoose from 'mongoose';

export const connect = () => mongoose.connect('mongodb://localhost/fmiJS', { useNewUrlParser: true });

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo DB connection error:'));
db.once('open', function () {
  console.log('Mongo DB connected!');
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

export const UserModel = mongoose.model('User', userSchema);
