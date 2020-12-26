prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width: 450,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90,
});
webcam = document.getElementById("webcam_view");
Webcam.attach(webcam);
function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshot_view").innerHTML = "<img src='" + data_uri + "'id='captured_image'>"
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dy-sR7cTf/model.json", modelLoaded);
function modelLoaded() {
console.log("modelLoaded");
}
function speak() {
    synth = window.speechSynthesis;
    speak_1= "The first prediction is"+prediction_1;
    speak_2= "The second prediction is"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterThis);
}

function check (){
img = document.getElementById("captured_image");
classifier.classify(img, gotResults);
}

function gotResults (error, results){
if (error){
console.error(error);  
}
else{
console.log(results);
prediction_1=results[0].label;
prediction_2=results[1].label;
document.getElementById("prediction_1").innerHTML= prediction_1;
document.getElementById("prediction_2").innerHTML= prediction_2;
speak();
if (prediction_1 == "happy"){
    document.getElementById("prediction_1_emoji").innerHTML="&#128516";
}
if (prediction_1 == "angry"){
    document.getElementById("prediction_1_emoji").innerHTML="&#128545";
}
if (prediction_1 == "sad"){
    document.getElementById("prediction_1_emoji").innerHTML="&#128532";
}

if (prediction_2 == "happy"){
    document.getElementById("prediction_2_emoji").innerHTML="&#128516";
}
if (prediction_2 == "angry"){
    document.getElementById("prediction_2_emoji").innerHTML="&#128545";
}
if (prediction_2 == "sad"){
    document.getElementById("prediction_2_emoji").innerHTML="&#128532";
}

}
}
