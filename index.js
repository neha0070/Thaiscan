require('dotenv').config();

const mongoose = require('mongoose');
const path = require("path");
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017')
.then(() => console.log('Database Connected successfully'));

const textextract = require('./services/textextract');
const credentialpath = './credential.json';
const imagePath = './idcard.jpg_large';
async function processImage() {
    try {
        const extractedData = await textextract.getData(imagePath, credentialpath);
        console.log(extractedData);
    } catch (error) {
        console.error('Error processing the image:', error.message);
    }
};
processImage();


const port = process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`server run successfully at port ${port}`);
})