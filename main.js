prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
}
);

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "resultImg" src = "'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KBgsAaTB6/model.json', ModelLoaded);

function ModelLoaded() {
    console.log('Model is Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speech1 = 'The first prediction is ' + prediction_1;
    speech2 = 'And second prediction is ' + prediction_2;
    var main_speech = new SpeechSynthesisUtterance(speech1 + speech2);
    synth.speak(main_speech);
}

function check(){
    img = document.getElementById("resultImg");
    classifier.classify(img, gotResults);
}

function gotResults(error,results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == 'Sad'){
            document.getElementById("update_emoji1").innerHTML = '&#128532;';
        }
        if(results[0].label == 'Happy'){
            document.getElementById("update_emoji1").innerHTML = '&#128522;';
        }
        if(results[0].label == 'Angry'){
            document.getElementById("update_emoji1").innerHTML = '&#128544;';
        }
        if(results[0].label == 'Shocked'){
            document.getElementById("update_emoji1").innerHTML = '&#128550;';
        }
        if(results[1].label == 'Sad'){
            document.getElementById("update_emoji2").innerHTML = '&#128532;';
        }
        if(results[1].label == 'Happy'){
            document.getElementById("update_emoji2").innerHTML = '&#128522;';
        }
        if(results[1].label == 'Angry'){
            document.getElementById("update_emoji2").innerHTML = '&#128544;';
        }
        if(results[1].label == 'Shocked'){
            document.getElementById("update_emoji2").innerHTML = '&#128550;';
        }
    }
}
