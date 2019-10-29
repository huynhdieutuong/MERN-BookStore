const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  lastPrice: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  },
  numSold: {
    type: Number,
    default: 0
  },
  body: {
    type: String,
    required: true
  },
  reviews: [
    {
      reviewStar: {
        type: Number,
        required: true
      },
      reviewComment: {
        type: String,
        required: true
      },
      reviewDate: {
        type: Date,
        default: Date.now
      },
      reviewUser: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer'
      }
    }
  ],
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

bookSchema.pre('save', function(next) {
  this.lastPrice = Math.round(this.price * (100 - this.discount)) / 100;
  next();
});

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;
