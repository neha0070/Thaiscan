require('dotenv').config();
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
}

processImage();




