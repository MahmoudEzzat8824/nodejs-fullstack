const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB connection error: MONGO_URI is not defined in environment');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// basic route
app.get('/', (req, res) => res.send('API is running...'));

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

start();