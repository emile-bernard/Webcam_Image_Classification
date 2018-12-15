// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extractor with MobileNet
=== */

let canvas;
let mobileNet;
let video;
let speech;
let label = '';

let voicePitch = 100;
let voiceRate = 10;
let voiceVolume = 5;
let pitchSlider;
let rateSlider;
let volumeSlider;

function modelReady() {
    console.log('Model is ready!');
    mobileNet.predict(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        // console.log(results);
        label = results[0].className;
        label += "(" + results[0].probability + ")";
        mobileNet.predict(gotResults);

        readResult(results[0].className.toString());
    }
}

function setup() {
    setupCanvas();
    setupVideo();
    setupSliders();
    setupMobileNet();
    setupSpeech();
}

function draw() {
    drawVideo();
    drawSliders();
}

function drawVideo() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(28);
    text(label, 10, height - 20);
}

function drawSliders() {
    let pitch = pitchSlider.value()/100;
    let rate = rateSlider.value()/10;
    let volume = volumeSlider.value()/10;

    voicePitch = pitch;
    voiceRate = rate;
    voiceVolume = volume;
}

function setupCanvas() {
    canvas = createCanvas(640, 550);
}

function setupVideo() {
    video = createCapture(VIDEO);
    video.hide();
}

function setupSliders() {
    // create sliders
    pitchSlider = createSlider(1, 200, voicePitch);//0.01, 2.0
    pitchSlider.position(20, 20);
    rateSlider = createSlider(1, 20, voiceRate);//0.1, 2.0
    rateSlider.position(20, 50);
    volumeSlider = createSlider(0, 10, voiceVolume);//0.0, 1.0
    volumeSlider.position(20, 80);
}

function setupMobileNet() {
    mobileNet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function setupSpeech() {
    speech = new p5.Speech();
}

function readResult(result) {
    speech.setPitch(voicePitch);
    speech.setRate(voiceRate);
    speech.setVolume(voiceVolume);
    speech.setVoice('Google UK English Female');
    speech.speak(result);
}

