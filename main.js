
//set up info needed for API calls
let apiURL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/3f0ec904-4324-4abd-ae38-ea2db93a13e3/image?iterationId=2c1d4568-5c2e-4487-92af-5c8089cc55cd";
let apiKey = "d8afb0b293cf4c06b39ba02273893162";

//get references to HTML elements
let emoji = document.querySelector("#emoji");
let btn = document.querySelector(".btn");

//helper to update UI
//consider changing emojis to better reflect your model
function updateEmoji(tagName) {
    console.log(tagName);
    if (tagName === "fish") {
        emoji.textContent = "🐟";
    } else if (tagName === "stick_figure") {
        emoji.textContent = "🤺";
    } else if (tagName === "flower") {
        emoji.textContent = "🌺";
    } else {
        emoji.textContent = "🤷‍♀";
    }
}

//create & execute post request to call API 
async function getClassification(blob) {
    console.log();
    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': apiKey,
        },
        body: blob
    });
    const data = await response.json();

    //update UI to show classication to user
    updateEmoji(data.predictions[0].tagName);

    return data;
}

//where the magic happens!
function analyzeDrawing() {

    //the canvas (drawSurface) is set up and referenced in the canvas.js file before we use it here
    drawSurface.toBlob(function (blob) {
        console.log(blob);
        let data = getClassification(blob);
    });
}

//connect magic to button
btn.addEventListener("click", analyzeDrawing);