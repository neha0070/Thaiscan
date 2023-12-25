require('dotenv').config();

const mongoose = require('mongoose');


const express = require('express');
const {resolve} = require("path");
const app = express();

const detailRoute = require('./routes/detail');

mongoose.connect('mongodb://localhost:27017/thaiscan')
.then(() => console.log('Database Connected successfully'));


// Set Views
app.set('view engine', 'ejs');
app.set('views', resolve('./views'));

app.get('/', async (req, res) => {
    return  res.render('home');
});

app.use('/detail', detailRoute);


const port = process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`server run successfully at port ${port}`);
})