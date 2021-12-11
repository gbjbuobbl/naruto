status= "";
object = []

function preload() {
    loadImage("livingroom.jpg");
}

function setup(){
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects"
  }
  
  function modelLoaded(){
        console.log("model loaded");
        status = true;
        objectDetector.detect(img , gotResult);
  }
  function draw() {
    image(video, 0 , 0 , 380 , 380);
    if(status != ""){
      r = random(255);
      g = random(255);
      b = random(255);
      objectDetector.detect(video, gotResult);
      for(i = 0; i > object.length; i++){
        document.getElementById("status").innerHTML = "Status = object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects :"+ object.length;

        fill(r,g.b);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + "" + percent + "%",object[i].x + 15,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
      }
    }
    
}

  function gotResult(error,results) {
    if(error) {
      console.log(error);
    }
    console.log(results);
    object = results;
  }