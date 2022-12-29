x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";
draw_apple = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening. Please speak. . .";
  recognition.start();
}

function preload() {
  apple = loadImage("apple.png");
}

function setup() {
screen_width = window.innerWidth;
screen_height = window.innerHeight;
canvas = createCanvas(screen_width, screen_height-130);
canvas.position(0, 125);
}

recognition.onresult = function (event) {
  console.log(event);
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The system has recognized: " + content;
  speak_data = "The system has recognized: " + content;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "System has started drawing apples. . .";
    draw_apple = "set";
  }
  else {
    document.getElementById("status").innerHTML = "Number not indentified. Try again."
    speak_data = "Number not indentified. Try again.";
    speak();
  }
}

function draw() {
  if (draw_apple == "set") {
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random()*1450);
      y = Math.floor(Math.random()*500);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " apples have been drawn.";
    draw_apple = "";
    speak_data = to_number + "apples have been drawn onto the canvas";
    speak();
  }
}


function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}

function clear_canvas(){
  background(rgb(192, 224, 255));
}