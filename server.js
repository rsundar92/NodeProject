
const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorhandle');
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 3001;

// app.get('/api/contacts', (req, res) => {
//     res.status(200).json({message :"Get all contacts"});
// })
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log('I am running on server with port number', port)
})