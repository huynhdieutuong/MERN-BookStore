require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(res => console.log('MongoDB Connected!'))
  .catch(err => console.error(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/books.route'));
app.use('/api/categories', require('./routes/categories.route'));
app.use('/api/authors', require('./routes/authors.route'));
app.use('/api/seller', require('./routes/seller.route'));
app.use('/api/buyer', require('./routes/buyer.route'));
app.use('/api/admin', require('./routes/admin.route'));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
