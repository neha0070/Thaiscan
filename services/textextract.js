require('dotenv').config();
const vision = require('@google-cloud/vision');
const fs = require('fs'); 

async function getData(imagePath, CredentialPath) {
    try {
        const client = new vision.ImageAnnotatorClient({
            keyFile: CredentialPath
        });

        // Read the image file
        const image = await fs.promises.readFile(imagePath);

        // Perform OCR on the image
        const [result] = await client.textDetection(image);

        // Extract relevant information
        const textAnnotations = result.textAnnotations;
        
        const description = textAnnotations[0].description;
        return await extract(description);
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

async function extract(text){
    // Extract Identification Number
    const idNumberMatch = text.match(/(\d{1,4}\s\d{4}\s\d{5}\s\d{2}\s\d{1})/);
    const identification_number = idNumberMatch ? idNumberMatch[0] : null;

    // Extract Name
    const nameMatch = text.match(/Name (.+?)\n/);
    const name = nameMatch ? nameMatch[1] : null;

    // Extract Last Name
    const lastNameMatch = text.match(/Last name (.+?)\n/);
    const last_name = lastNameMatch ? lastNameMatch[1] : null;

    // Extract Dates
    const dateMatches = text.match(/(\d{1,2} [A-Za-z]+\.* \d{4})/g);
    if (dateMatches === null || dateMatches.length !== 3) {
        return {
            status: 'UNSUCCESSFUL',
            identification_number,
            name,
            last_name,
            date_of_birth: '',
            date_of_issue: '',
            date_of_expiry: ''
        };
    }
    // Assign dates to variables
    const date_of_birth = dateMatches ? convertToDate(dateMatches[0]) : null;
    const date_of_issue = dateMatches ? convertToDate(dateMatches[1]) : null;
    const date_of_expiry = dateMatches ? convertToDate(dateMatches[2]) : null;
    if(
        identification_number !== null &&
        name !== null &&
        last_name !== null &&
        date_of_birth != null &&
        date_of_issue !== null &&
        date_of_expiry !== null) {
        return {
            status: 'SUCCESS',
            identification_number,
            name,
            last_name,
            date_of_birth,
            date_of_issue,
            date_of_expiry
        };
    }
    return {
        status: 'UNSUCCESSFUL',
        identification_number,
        name,
        last_name,
        date_of_birth,
        date_of_issue,
        date_of_expiry
    };

}

const convertToDate = (dateString) => {
    try{
        if (dateString === null) return '';
        const parts = dateString.split(' ');
        const monthIndex = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'].indexOf(parts[1]) + 1;
        const month = monthIndex.toString().padStart(2, '0');
        return `${parts[2]}-${month}-${parts[0].toString().padStart(2, '0')}`;
    }catch (error) {
        console.log('error while converting to Date', error);
        return '';
    }
};

module.exports = {
    getData
};
