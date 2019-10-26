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

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello'));

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
