var currentSelectedParent, selectedPrevParent, supportOptions, supportOptionsRollerOptions;
function radioChilds()
{

    if (radio.value() == "Load")
    {
        selectedCurrentParent = "Load";
        loadInpX = createInput('0');
        loadInpY = createInput('0');
        loadInpX.attribute('placeholder', 'Load in x direction');
        loadInpY.attribute('placeholder', 'Load in y direction');
    }
    else if (typeof loadInpX !== "undefined")
    {
        loadInpX.remove();
        loadInpY.remove();
    }
    if (radio.value() == "Node")
    {
        nodeOptions = createRadio("nodeOption");
        nodeOptions.option("Add Node");
        //nodeOption.option("Delete Node");
        nodeOptions.option("Edit Node");
        nodeOptions._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof nodeOptions !== "undefined")
    {
        nodeOptions.remove();
    }
    if (radio.value() != "Node" && editNodeInpX)
    {
        editNodeInpX.remove();
        editNodeInpY.remove();
    }
    if (radio.value() == "Support")
    {
        supportOptions = createRadio("supportOptions");
        supportOptions.option("Roller");
        supportOptions.option("Hinge");
        supportOptions.option("Delete Support");
        supportOptions._getInputChildrenArray()[0].checked = true;
        supportOptionsChilds();
        supportOptions.input(supportOptionsChilds);
    }
    else if (typeof supportOptions !== "undefined")
    {
        supportOptions.remove();
    }
}
var circle, editNodeInpX,editNodeInpY;
function nodeoptionsChilds(){
    var isInside = false;
    if (nodeOptions.value() == "Edit Node")
    {
        if (circles.length > 0) {
            if (mouseIsPressed){
                for (var i = 0; i < circles.length; i++) {
                    circle = circles[i],
                            distance = dist(mouseX, mouseY, circle.x, circle.y);
                    if (distance <= radius*2) {//radius*2 for getting rid of overlapping of nodes
                        isInside = true;
                        break;
                    } else {
                        isInside = false;
                    }
                }
            }
        }
    }
}//End of nodeOptionChilds

var rollers = [];
function drawSupportAt(i,supportType,extraInfo){
    if (supportType=="Roller")
    {
        circles[i].support = 'Roller';
        if(extraInfo=="Restrained in Y")
        {
            circles[i].DOF = 2;
        }else if(extraInfo=="Restrained in X")
        {
            circles[i].DOF = 1;
        }
    }
    else if (supportType=="Hinge")
    {
        circles[i].support = 'Hinge';
        circles[i].DOF = extraInfo;
    }
    else if (supportType=="Delete Support")
    {
        circles[i].support = 'None';
        circles[i].DOF = extraInfo;
    }
console.log(circles);
}
// Define variables.
var radius = 7;
var circles = [], members = [];//curcles object
//var circles = [
//	{ x: 50, y: 50, color:' #000', active: false },
//	{ x: 150, y: 50, color: '#000', active: false },
//	{ x: 250, y: 50, color: '#000', active: false }
//]
function supportOptionsChilds(){
    if (supportOptions.value()=="Roller")
    {
        supportOptionsRollerOptions = createRadio('supportOptionsRollerOptions');
        supportOptionsRollerOptions.option('Restrained in Y');
        supportOptionsRollerOptions.option('Restrained in X');
        supportOptionsRollerOptions._getInputChildrenArray()[0].checked = true;
    }
    else if (supportOptions.value()!="Roller" && supportOptionsRollerOptions)
    {
        supportOptionsRollerOptions.remove();
    }
}
// Set up canvas.
function setup() {
  var width  = 500, height = 500;
  // Create canvas using width/height of window.
  var canvas = createCanvas(width, height);
  canvas.addClass("aiP5");
    
  ellipseMode(RADIUS);
    radio = createRadio("Primary");
    radio.option('Node');
    radio.option('Member');
    radio.option('Load');
    radio.option('Support');
    //setting the node to be checked by deafult
    radio._getInputChildrenArray()[0].checked = true;
    radio.addClass("drawOptions");
    radioChilds();
    radio.input(radioChilds);
    if (radio.value()=='Support')
    supportOptions.input(supportOptionsChilds);
    
}//End of setup function

// Draw on the canvas.
function draw() {
	background('#fff');
    //stroke('#a5a5a5');
    //line(20,0,20,500);
    if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height)
            {
                if(radio.value()=="Node")
                                cursor(CROSS);
                if (circles.length > 0) {
                    for (i = 0; i < circles.length; i++) {
                        var circle = circles[i],
                                distance = dist(mouseX, mouseY, circle.x, circle.y);
                                                    
                            if (radio.value()=="Member"){
                                if (distance <= radius*2){
                                    cursor(HAND);
                                    break;
                                } //radius*2 for getting rid of overlapping of nodes
                                else
                                    cursor(ARROW);
                            
                        }
                    }
                }
            }
   	if (circles.length > 0) {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];
			noStroke();
			fill(circle.color);
			ellipse(circle.x, circle.y, radius, radius);
            text("("+String(circle.x)+", "+String(circle.y)+")",circle.x+10,circle.y+10);
            if(circle.support=="Roller")
            {
                stroke(0);
                strokeWeight(3);
                fill(255);
                if(circle.DOF==2)
                {
                    line(circle.x,circle.y,circle.x+15,circle.y+15);
                    line(circle.x,circle.y,circle.x-15,circle.y+15);
                    line(circle.x-15,circle.y+15,circle.x+15,circle.y+15);
                    ellipse(circle.x-14,circle.y+19,4,4);
                    ellipse(circle.x,circle.y+19,4,4);
                    ellipse(circle.x+14,circle.y+19,4,4);
                }else if(circle.DOF==1)
                {
                    line(circle.x,circle.y,circle.x+15,circle.y+15);
                    line(circle.x,circle.y,circle.x+15,circle.y-15);
                    line(circle.x+15,circle.y+15,circle.x+15,circle.y-15);
                    ellipse(circle.x+19,circle.y-14,4,4);
                    ellipse(circle.x+19,circle.y,4,4);
                    ellipse(circle.x+19,circle.y+14,4,4);
                }
            }
            else if(circle.support=="Hinge")
            {
                var l = 5;//controls the length of the botton array of lines in hinges
                stroke(0);
                strokeWeight(3);
                fill(255);
                line(circle.x,circle.y,circle.x+15,circle.y+15);
                line(circle.x,circle.y,circle.x-15,circle.y+15);
                line(circle.x-15,circle.y+15,circle.x+15,circle.y+15);
                for (var ll = 0; ll<5; ll++)
                line(circle.x-15+ll*7.5,circle.y+15,circle.x-15-l+ll*7.5,circle.y+15+l);                
            }
		}
	}
    if (members.length > 0) {
		for (i = 0; i < members.length; i++) {
			var member = members[i];
            stroke(member.color);
            strokeWeight(member.strokeWeight);
			line(circles[member.lineStart].x, circles[member.lineStart].y, circles[member.lineEnd].x, circles[member.lineEnd].y);
            //text("("+String(circle.x)+", "+String(circle.y)+")",circle.x+10,circle.y+10)
		}
	}

}//End of Draw function
var firstPress = 1, lineStart, lineEnd;
// Run when the mouse/touch is down.
function mousePressed() {
    if (nodeOptions.value()=="Edit Node")
        if (mouseButton=="left")
            nodeoptionsChilds();
    for (i = 0; i < circles.length; i++) {
        circles[i].active=false;
        circles[i].color = '#000';
    }
    var addNodePermit = true;
    
    var circleProps = {}, memberProps = {};
    if(radio.value()== "Node")
    {
        if (mouseButton=="left")
        {
            if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height)
            {
                if (circles.length > 0) {
                    for (i = 0; i < circles.length; i++) {
                        var circle = circles[i],
                                distance = dist(mouseX, mouseY, circle.x, circle.y);
                        if (distance <= radius*2) {//radius*2 for getting rid of overlapping of nodes
                            circle.active = true;
                            circle.color = '#f00';
                            addNodePermit = false;
                            break;
                        } else {
                            circle.active = false;
                            circle.color = '#000';
                            addNodePermit = true;
                        }
                    }
                }
                if (nodeOptions.value() == "Add Node")
                {
                    if(addNodePermit == true)
                    {
                        circleProps["x"]=roundVal(mouseX);
                        circleProps["y"]=roundVal(mouseY);
                        circleProps["color"]="#000";
                        circleProps["active"]=false;
                        circleProps["support"]='none';
                        circleProps["DOF"]='none';
                        circles.push(circleProps);
                    }
                }

            }
        }
    }
    if(radio.value() == "Member")
    {
       if (mouseButton=="left")
       {
           var circle,  distance;
           for (i = 0; i<circles.length; i++)
           {
                circle = circles[i];
                distance = dist(mouseX, mouseY, circle.x, circle.y);

                if(distance<=radius*2)
                { 
                    if (firstPress == 1) {
                        firstPress = 0;//This makes sure that first point is clicked and is ready for the next point
                        lineStart = i;
                        circle.active = true
                        circle.color = '#f00';
                    }
                    else if (firstPress == 0) {
                        firstPress = 1;//This makes sure that second point is clicked.
                        lineEnd = i;
                        circle.active = true;
                        circle.color = '#f00';
                        if (circles[lineEnd].x-circles[lineStart].x!=0 && circles[lineEnd].y-circles[lineStart].y!=0) //If the first point is clicked twice than the line will be cancelled and the process needs to be repeated
                        {
                            memberProps['lineStart']=lineStart;
                            memberProps['lineEnd']=lineEnd;
                            memberProps['strokeWeight']=2;
                            memberProps['color']='#000';
                            members.push(memberProps);                            
                        }
                    }
                    break;
                }
           }
       }
    }
	if(radio.value()=="Support")
    {
        if (mouseButton=="left")
        {
           var circleind,  distanceSup;
           for (i = 0; i<circles.length; i++)
           {
                circleInd = i;
                distanceSup = dist(mouseX, mouseY, circles[i].x, circles[i].y);
                if(distanceSup<=radius*2)
                {
                    if (supportOptions.value()=="Roller"){
                        drawSupportAt(circleInd,supportOptions.value(),supportOptionsRollerOptions.value());
                        break;
                    }
                    else if (supportOptions.value()=="Hinge"){
                        drawSupportAt(circleInd,supportOptions.value(),'none');
                        break;
                    }
                    else if (supportOptions.value()=="Delete Support"){
                        drawSupportAt(circleInd,supportOptions.value(),'none');
                        break;
                    }
                }
           }
        }
    } 
  // Prevent default functionality.
  return false;
}//End of mousePressed()

// Run when the mouse/touch is dragging.
var mouseRoundX, mouseRoundY;
function roundVal(value){
    value = Math.abs(value);
    var intValue = parseInt(value), fracValue = value-intValue;//getting the integar and fraction part of the value provided in argument
    if (fracValue >=0.5)
        return Math.ceil(value);
    else
        return Math.floor(value);
}
function mouseDragged() {
    if(radio.value()== "Node")
    {
        if (mouseButton=="left")
        {
            if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height)
            {
                if (nodeOptions.value() == "Edit Node")
                {
                    if (circles.length > 0) {
                        for (var i = 0; i < circles.length; i++) {
                            var circle = circles[i];
                            if (circle.active) {
                                circle.x = roundVal(mouseX);
                                circle.y = roundVal(mouseY);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
	
  // Prevent default functionality.
  return false;
}