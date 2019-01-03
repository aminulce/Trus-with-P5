var currentSelectedParent, selectedPrevParent;
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
        nodeOption = createRadio("nodeOption");
        nodeOption.option("Add Node");
        //nodeOption.option("Delete Node");
        nodeOption.option("Edit Node");
        nodeOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof nodeOption !== "undefined")
    {
        nodeOption.remove();
    }
    if (radio.value() != "Node" && editNodeInpX)
    {
        editNodeInpX.remove();
        editNodeInpY.remove();
    }
    if (radio.value() == "Support")
    {
        supportOption = createRadio("supportOptions");
        supportOption.option("Roller");
        supportOption.option("Hinge");
        supportOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof supportOption !== "undefined")
    {
        supportOption.remove();
    }
    /*if (radio.value() == "Member")
    {
        memberOption = createRadio("memberOptions");
        memberOption.option("Add Member");
        memberOption.option("Delete Memner");
        memberOption._getInputChildrenArray()[0].checked = true;
    }
    else if (typeof memberOption !== "undefined")
    {
        memberOption.remove();
    }*/
}
var circle, editNodeInpX,editNodeInpY;
function nodeoptionsChilds(){
    var isInside = false;
    if (nodeOption.value() == "Edit Node")
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
//        if (isInside){
//            if (editNodeInpX){
//                editNodeInpX.remove();
//                editNodeInpY.remove();
//                editNodeInpX = createInput();
//                editNodeInpX.attribute('value', String(circle.x));
//                editNodeInpY = createInput(String(500-circle.y));//500 is the height of the canvas. circle y is ssubtracted from 500 to emitate the actual coordinate system where origin is located at the bottom left corner.
//            }else if (typeof editNodeInpX === "undefined"){
//                editNodeInpX = createInput(String(circle.x));
//                editNodeInpY = createInput(String(circle.y));
//            }
//        }
    }
//    else if (typeof loadInpX !== "undefined"){
//        loadInpX.remove();
//        loadInpY.remove();
//    }
}
// Define variables.
var radius = 7;
var circles = [], members = [];//curcles object
//var circles = [
//	{ x: 50, y: 50, color:' #000', active: false },
//	{ x: 150, y: 50, color: '#000', active: false },
//	{ x: 250, y: 50, color: '#000', active: false }
//]

// Set up canvas.
function setup() {
  createInput();
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
    
}

// Draw on the canvas.
function draw() {
	background('#fff');
    stroke('#a5a5a5');
    line(20,0,20,500);
    if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
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
            text("("+String(circle.x)+", "+String(circle.y)+")",circle.x+10,circle.y+10)
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
    //line(0,0,250,250);
}
var firstPress = 1, lineStart, lineEnd;
// Run when the mouse/touch is down.
function mousePressed() {
    if (nodeOption.value()=="Edit Node")
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
            if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
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
                if (nodeOption.value() == "Add Node")
                {
                    if(addNodePermit == true)
                    {
                        circleProps["x"]=roundVal(mouseX);
                        circleProps["y"]=roundVal(mouseY);
                        circleProps["color"]="#000";
                        circleProps["active"]=false;
                        circles.push(circleProps);
                    }
                }
               
                /*if (nodeOption.value() == "Delete Node")
                {
                    console.log("Deleting node");
                    for (i=0; i<nodes.length;i++)
                    {
                        distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                        if(distance[i]<=nodeRad)
                        {
                            addNodePermit = true;
                            break;
                        }
                        else
                        {                            
                            addNodePermit = false;                          
                        }
                    }

                    if(addNodePermit == true)
                    {
                        console.log(nodeCoords.length);
                        nodeCoords.splice(i,1);
                        nodes.splice(i,1);
                        console.log(nodeCoords);
                    }
                }*/
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
                    //Drawing the member
    //                if (num==27)
    //                    firstPress = 1;
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
                    console.log(memberProps);
                    break;
                }
               //else firstPress = 1;
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
//    if (nodeOption.value()=="Edit Node")
//        if (mouseButton=="left")
//            nodeoptionsChilds();
    if(radio.value()== "Node")
    {
        if (mouseButton=="left")
        {
            if(mouseX>0 && mouseX<500 && mouseY>0 && mouseY<500)
            {
                /*for (var i=0; i<circles.length;i++)
                {
                    distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                    if(distance[i]<=nodeRad)
                    {
                        addNodePermit = false;
                        break;
                    }
                }*/
                if (nodeOption.value() == "Edit Node")
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
               
                /*if (nodeOption.value() == "Delete Node")
                {
                    console.log("Deleting node");
                    for (i=0; i<nodes.length;i++)
                    {
                        distance[i]=nodes[i].checkDistance(mouseX,mouseY);
                        if(distance[i]<=nodeRad)
                        {
                            addNodePermit = true;
                            break;
                        }
                        else
                        {                            
                            addNodePermit = false;                          
                        }
                    }

                    if(addNodePermit == true)
                    {
                        console.log(nodeCoords.length);
                        nodeCoords.splice(i,1);
                        nodes.splice(i,1);
                        console.log(nodeCoords);
                    }
                }*/
            }
        }
    }
	
  // Prevent default functionality.
  return false;
}