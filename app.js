const express = require('express');
const cors = require('cors');
const app = express();
const bookRoutes = require('./app/routes/book.route');
app.use('/api/books', bookRoutes);
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to book application.' });
});
module.exports = app;