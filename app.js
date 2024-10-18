const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const subscriptionKey = '0e48197bd7664f0dbc07cf806299a132';
const endpoint = 'https://flowe32.cognitiveservices.azure.com/';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/analyze', upload.single('flowerImage'), async (req, res) => {
    const imagePath = req.file.path;

    try {
        const imageData = fs.readFileSync(imagePath);

        const azureResponse = await axios.post(
            `${endpoint}/vision/v3.2/analyze?visualFeatures=Description`,
            imageData,
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-Type': 'application/octet-stream'
                }
            }
        );

        const description = azureResponse.data.description.captions[0].text;

        res.send(`
            <html>
            <head>
                <title>Flower Recognition Result</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    img { max-width: 100%; height: auto; margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1>Flower Recognition Result</h1>
                <p><strong>Description:</strong> ${description}</p>
                <img src="/uploads/${req.file.filename}" alt="Uploaded Flower Image">
                <br><br>
                <a href="/">Upload another image</a>
            </body>
            </html>
        `);

        fs.unlinkSync(imagePath);

    } catch (error) {
        console.error("Error analyzing image:", error);
        res.status(500).send("Error analyzing image. Please try again.");
    }
});

app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
