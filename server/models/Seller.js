const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [
    {
      books: [
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
      buyer: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Seller = mongoose.model('Seller', sellerSchema, 'sellers');

module.exports = Seller;
