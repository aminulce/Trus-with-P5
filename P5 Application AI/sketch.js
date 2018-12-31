class Node{
    constructor(clickX, clickY,nodeRad) 
    {
        this.X = clickX;
        this.Y = clickY;
        this.rad = nodeRad;
    }

    drawNode(){
        fill(255);
        stroke(100);
        strokeWeight(1);
        ellipse(this.X, this.Y, this.rad*2);
    }

    checkDistance(x,y){
        return(dist(x, y,this.X,this.Y));
    }
}

var nodeCount = 0;
var canvas, canvasW = 500, canvasH = 500, X, Y, nodeRad = 5;
var nodes = [];
var sliderVal;
var radio;
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
    noLoop();

}
var firstPress = 1;
var distance = [];
var addNodePermit;
function mousePressed(){
    addNodePermit = true;
    if(radio.value() == "node")
    {
        if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
        {
            for (var i=0; i<nodes.length;i++)
            {
                distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                if(distance[i]<=nodeRad)
                {
                    addNodePermit = false;
                    break;
                }
            }

            if(addNodePermit == true)
            {
                nodes[nodeCount] = new Node(mouseX,mouseY,nodeRad);
                nodes[nodeCount++].drawNode();
            }
        }
    }
   if(radio.value() == "member")
   {
       stroke(0);
       strokeWeight(2);
       for (i = 0; i<nodes.length; i++)
       {
            distance[i]=nodes[i].checkDistance(mouseX,mouseY);

            if(distance[i]<=nodeRad)
            {
                 //Drawing the member
               if (firstPress == 1) {
                firstPress = 0;
                x0 = nodes[i].X;
                y0 = nodes[i].Y;
              }
              else if (firstPress == 0) {
                firstPress = 1;
                x = nodes[i].X;
                y = nodes[i].Y;
                line(x0, y0, x, y);
              }         
            }
       }
       
     
   }
}
//function mouseReleased() {
//  noLoop();
//}


function draw() {
    background(255);
}


