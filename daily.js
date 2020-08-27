const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAI);
const base = "https://imgapi.ndev.tk/nature/embed";
const https = require('https');
const fs = require('fs');

getImage();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getImage(times = 10) {
    url = base;
    for (var i = 1; i <= times; i++) {
        url = await style(url);
        await sleep(1000);
    }
    url = await deepdream(url);
    let file = fs.createWriteStream("bg.png");
    let request = https.get(url, function(response) {
        response.pipe(file);
    });
}

async function style(url) {
    var result = await deepai.callStandardApi("neural-style", {
        content: url,
        style: base
    });
    return result.output_url;
}

async function deepdream(url) {
    var result = await deepai.callStandardApi("deepdream", {
        image: url
    });
    return result.output_url;
}
