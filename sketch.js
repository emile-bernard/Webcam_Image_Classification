// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extractor with MobileNet
=== */

let mobilenet;
let video;
let label = '';

function modelReady() {
    console.log('Model is ready!');
    mobilenet.predict(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        label = results[0].className;
        label += "(" + results[0].probability + ")";
        mobilenet.predict(gotResults);
    }
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(28);
    text(label, 10, height - 20);
}
