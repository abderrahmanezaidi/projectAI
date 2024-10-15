// Load the selected image onto canvas
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let imageFile;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        imageFile = file;
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});
/*
// Azure endpoints and keys
const visionEndpoint = 'https://documentscannervision.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=objects';
const formRecognizerEndpoint = 'https://documentocr12.cognitiveservices.azure.com/formrecognizer/v2.1-preview.2/layout/analyze';
const subscriptionKey = 'ba234200479c495db00776e3147e6d6e';

document.getElementById('detectBtn').addEventListener('click', async () => {
    if (!imageFile) {
        alert('Please upload an image.');
        return;
    }

    // Call Azure Vision API for document detection
    const imgBlob = await fileToBlob(imageFile);
    const result = await detectDocument(imgBlob);
    if (result) {
        // Process detected bounding box and draw it on the canvas
        drawBoundingBox(result.objects);
    }
});

document.getElementById('savePDFBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'document.pdf';
    link.href = canvas.toDataURL('application/pdf');
    link.click();
});

async function detectDocument(imageBlob) {
    const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/octet-stream',
    };

    const response = await fetch(visionEndpoint, {
        method: 'POST',
        headers: headers,
        body: imageBlob,
    });
    return await response.json();
}

async function fileToBlob(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsArrayBuffer(file);
    });
}

function drawBoundingBox(objects) {
    // Loop through objects and draw bounding box (if documents detected)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageFile, 0, 0, canvas.width, canvas.height);
    
    objects.forEach((obj) => {
        if (obj.object === 'document') {
            const { x, y, w, h } = obj.rectangle;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, w, h);
        }
    });
}

// Optional OCR Feature
async function extractText(imageBlob) {
    const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/octet-stream',
    };

    const response = await fetch(formRecognizerEndpoint, {
        method: 'POST',
        headers: headers,
        body: imageBlob,
    });

    const ocrResult = await response.json();
    document.getElementById('ocrText').textContent = formatOCRResult(ocrResult);
}

function formatOCRResult(ocrResult) {
    let extractedText = '';
    ocrResult.analyzeResult.readResults.forEach(page => {
        page.lines.forEach(line => {
            extractedText += line.text + '\n';
        });
    });
    return extractedText;
}
*/
