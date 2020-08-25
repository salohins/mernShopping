const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoUri');

// Connect to Mongo
 
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true 
    })
    .then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


