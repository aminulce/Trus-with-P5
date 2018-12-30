class Node{
    constructor(clickX, clickY,nodeRad) 
    {
        this.X = clickX;
        this.Y = clickY;
        this.rad = nodeRad;
        this.brightness = 0;
    }

    drawNode(){
        fill(255);
        stroke(255,0,220);
        ellipse(this.X, this.Y, this.rad*2);
    }
    move()
    {
        this.X = this.X + random(2,-2);
        this.Y = this.Y + random(2,-2);
    }
    clicked(x,y,i){
        var d  = dist(x, y,this.X,this.Y);
        if (d<=this.rad)
        {
            this.brightness = 255;
        }
    }
}

var nodeCount = 0;
var canvas, canvasW = 500, canvasH = 500, X, Y, nodeRad = 5;
var nodes = [];
var sliderVal;
var radio;
var isOverCircle = false;
let N;
function setup() {
    canvas = createCanvas(canvasW,canvasH);
    background(255);
    canvas.addClass("aiP5");

    radio = createRadio("Name");
    radio.option('node');
    radio.option('member');
    radio.option('load');
    radio.option('support');
    radio.addClass("drawOptions");

}

function mousePressed(){
    if(radio.value() == "node")
    {
        if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
        {
            nodes[nodeCount] = new Node(mouseX,mouseY,nodeRad);
            nodes[nodeCount++].drawNode();
        }
    }

   if(radio.value() == "member")
   {
    // get distance between mouse and circle
    for (let i=0;i<nodes.length;i++)
    {
         distance[i]= dist(mouseX, mouseY, 200, 200); 
        console.log(distance[i])
        // if the distance is less than the circle's radius
        if(distance < nodeRad)
        {

            isOverCircle = true;
            cursor(HAND);
        } else {
            isOverCircle = false;
            cursor(ARROW);
        }
    }
   }
}
var distance = [];
function draw() {
    background(255);


    
    noLoop()
}


