const path = './credentialskey.json';
const fs = require('fs');
const vision = require('@google-cloud/vision');

async function getData(imagePath) {
    try {
        const client = new vision.ImageAnnotatorClient({
            keyFile: path,
        });

        // Read the image file
        const image = await fs.promises.readFile(imagePath);

        // Perform OCR on the image
        const [result] = await client.textDetection(image);

        // Extract relevant information
        const textAnnotations = result.textAnnotations;

        if (textAnnotations && textAnnotations.length > 0) {
            const description = textAnnotations[0].description;
            const structuredData = description.split('\n');

            const identification_number = structuredData[1];
            const name = structuredData[5].split('Name')[1].trim();
            const last_name = structuredData[6].split('Last name')[1].trim();
            const dob = structuredData[8].split('Date of Birth')[1].trim();
            const doi = structuredData[14];
            const doe = structuredData[21];
            console.log(structuredData[6]);
            console.log(typeof(structuredData));
            return structuredDatas = {
                identification_number,
                name,
                last_name,
                dob,
                doi,
                doe
            };
        } else {
            console.error('No text annotations found.');
            return null;
        }
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}


(async () => {
    const imagePath = './idcard.jpg_large';
    const imagedata = await getData(imagePath);

    if (imagedata) {
        // Save the structured data to a file or perform further processing
        fs.writeFile('structured_data.json', JSON.stringify(imagedata, null, 2), (err) => {
            if (err) console.error('Error writing file:', err);
            else console.log('Structured data saved to structured_data.json');
        });

        // Log the structured data to the console
        console.log(imagedata);
    }
})();