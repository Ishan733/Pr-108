
prediction_1=""
prediction_2=""
Webcam.set({
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';

    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ryZTCnIo0/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelloaded');
    
    }
    function speak(){
    var synth  = window.speechSynthesis;
    speak1 = "The first prediction is " + prediction_1;
    speak2  = "The second prediction is"+ prediction_2;
    var utter = new SpeechSynthesisUtterance(speak1+speak2);
    utter.rate = 0.5;
    synth.speak(utter);
    }
    
    function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img,gotResult);
    
    }
    
    function gotResult(error,results){
        if (error)
        {
    console.error(error);
    
        }
        else
    {
     console.log(results);
     document.getElementById("result1").innerHTML=results[0].label; 
     document.getElementById("result2").innerHTML = results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="best"){
        document.getElementById("update1").innerHTML="&#128076;";
    }
    if(results[0].label=="victory"){
        document.getElementById("update1").innerHTML="&#9996;;";
    }
    
    if(results[0].label=="amazing"){
        document.getElementById("update1").innerHTML="&#128077;";
    }
    if (results[1].label=="best"){
        document.getElementById("update2").innerHTML="&#9996;";
    }
    if(results[1].label=="victory"){
        document.getElementById("update2").innerHTML="&#128532;";
    }
    
    if(results[1].label=="amazing"){
        document.getElementById("update2").innerHTML="&#128077;";
    }
    }
    
    }