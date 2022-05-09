objects = [];
status = "";
function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    
    obj_detected = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects"
}

function modelLoaded(){
    console.log("model is loaded")
    status = true;
}
function gotresults(result,error){
    if (error){
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        obj_detected.detect(video,gotresults);
        for(i=0; i < objects[i].label;i++){
            document.getElementById("status").innerHTML = "Status: objects detected";
            fill("aqua");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" " + percent+"%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("aqua");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].heigth);
            if(objects[i].label == "person"){
                document.getElementById("baby").innerHTML = "Baby is found";
                alarm.stop();
            }
            else{
                document.getElementById("baby").innerHTML = "Baby is not found!";
                alarm.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("baby").innerHTML = "baby is not Found!!"
            alarm.play();
        }
    }
}