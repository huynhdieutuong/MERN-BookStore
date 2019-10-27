const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  image: String,
  cart: [
    {
      book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Buyer = mongoose.model('Buyer', buyerSchema, 'buyers');

module.exports = Buyer;
