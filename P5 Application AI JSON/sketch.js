var supportOptions, supportOptionsRollerOptions,loadOptions, loadInp, hasLoadInp = 0,editNodeInpX,editNodeInpY,out;
function radioChilds()
{
    if (radio.value() == "Load")//Do these when load is selected
    {
        loadOptions=createRadio('loadOptions');
        loadOptions.option("Load in X direction");
        loadOptions.option("Load in Y direction");
        loadOptions.option("Remove Load");
        loadOptions._getInputChildrenArray()[0].checked = true;
        loadOptionChilds();
        loadOptions.input(loadOptionChilds);

    }
    else if (typeof loadOptions !== "undefined")
    {
        loadOptions.remove();
        if(hasLoadInp){
            loadInp.remove();
            hasLoadInp = 0;
        }
    }
    if (radio.value() == "Node")//Do these when node is selected
    {
        nodeOptions = createRadio("nodeOption");
        nodeOptions.option("Add Node");
        //nodeOption.option("Delete Node");
        nodeOptions.option("Edit Node");
        nodeOptions._getInputChildrenArray()[0].checked = true;
        nodeOptions.input(nodeOptionChilds);
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
    if (radio.value() == "Support")//Do these when support is selected
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
        supportOptionsRollerOptions.remove();
    }
}
var circle, editNodeInpX,editNodeInpY;
function nodeClicked(){
    if (circles.length > 0) {
        for (var i = 0; i < circles.length; i++) {
            circle = circles[i],
                    distance = dist(mouseX, mouseY, circle.x, circle.y);
            if (distance <= radius*2) {//radius*2 for getting rid of overlapping of nodes
                isInside = true;
                circle.active = true;
                circle.color = '#f00';
                break;
            } else {
                circle.active = false;
                circle.color = '#000';
                isInside = false;
            }
        }
    }
}//End of nodeOptionChilds

function drawSupportAt(i,supportType,extraInfo){
    if (supportType=="Roller")
    {
        circles[i].support = 'Roller';
        if(extraInfo=="Restrained in Y")
        {
            if (circles[i].hasLoadInY)
                alert('Consider removing the load in Y direction');
            else
                circles[i].DOF = 2;
        }else if(extraInfo=="Restrained in X")
        {
            if (circles[i].hasLoadInX)
                alert('Consider removing the load in X direction');
            else
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
        circles[i].support = 'none';
        circles[i].DOF = extraInfo;
    }
}
function drawLoadAt(i,loadDirection,loadVal){
    if (loadDirection==1)
    {
        if (circles[i].support =='Roller'){
            if(circles[i].DOF ==1)
                alert('Consider removing the Roller support along X direction');
        } else if (circles[i].support =='Hinge'){
            if(circles[i].DOF ==1)
                alert('Consider removing the Hinge Support');
        }else
            circles[i].hasLoadInX = loadVal;
    }
    else if (loadDirection==2)
    {
        if (circles[i].support =='Roller'){
            if(circles[i].DOF ==2)
                alert('Consider removing the Roller support along Y direction');
        } else if (circles[i].support =='Hinge'){
            if(circles[i].DOF ==1)
                alert('Consider removing the Hinge Support');
        }else
        circles[i].hasLoadInY = loadVal;
    }
    else if (loadDirection==0)
    {
        circles[i].hasLoadInX = 0;
        circles[i].hasLoadInY = 0;
    }
}
// Define variables.
var radius = 7;
var circles = [], members = [];//curcles object
function nodeOptionChilds(){
    if(nodeOptions.value()=='Edit Node'){
//        editNodeInpX = createInput();
//        editNodeInpY = createInput();
    }
    else if(editNodeInpX){
        editNodeInpX.remove();
        editNodeInpY.remove();
    }
}
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

function createLoadInp(option){
    if (option=="Load in X direction"||option=="Load in Y direction"){
        if (hasLoadInp == 0){
            loadInp = createInput();
            hasLoadInp = 1;
        }
    }
    else if (hasLoadInp){
        loadInp.remove();
        hasLoadInp=0;
    }
}
function loadOptionChilds(){
    createLoadInp(loadOptions.value())
}
function calculate(){
    if(circles.length>2)
    {
        
    }
    else
        alert('At least three nodes required');
    
}
function calcLength(s,e){//s=start, e=end
    return dist(circles[s].x,circles[s].y,circles[e].x,circles[e].y);
}
// Set up canvas.
var button;
function setup() {
  var width  = 500, height = 500;//height and with of canvas
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
    button = createButton('Calculate');
    button.attribute('disabled');
    button.mousePressed(calculate);
}//End of setup function
var centerX, centerY;
// Draw on the canvas.
function draw() {
    cursor(ARROW);
	background('#fff');
    if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height)
    {
        if(radio.value()=="Node")
            cursor(CROSS);
        if (circles.length > 0) {
            for (i = 0; i < circles.length; i++) {
                var circle = circles[i],
                        distance = dist(mouseX, mouseY, circle.x, circle.y);

                    if (radio.value()!="Node"){
                        if (distance <= radius*2){
                            cursor(HAND);
                            break;
                        } //radius*2 for getting rid of overlapping of nodes


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
            circle.hasLoadInX;
            if (circle.hasLoadInX!=0 || circle.hasLoadInY!=0){
                if (circle.hasLoadInX>0){//load in positive X direction
                    stroke('#429bf4');
                    strokeWeight(3);
                    line(circle.x,circle.y,circle.x-13,circle.y-8);
                    line(circle.x,circle.y,circle.x-13,circle.y+8);
                    line(circle.x,circle.y,circle.x-30,circle.y);
                    noStroke();
                    text(circle.hasLoadInX, circle.x-30,circle.y-10);
                }if (circle.hasLoadInX<0){//load in negative X direction
                    stroke('#429bf4');
                    strokeWeight(3);
                    line(circle.x,circle.y,circle.x+13,circle.y-8);
                    line(circle.x,circle.y,circle.x+13,circle.y+8);
                    line(circle.x,circle.y,circle.x+30,circle.y);
                    noStroke();
                    text(circle.hasLoadInX, circle.x+30,circle.y-10);
                }if (circle.hasLoadInY<0){//load in positive Y direction
                    stroke('#429bf4');
                    strokeWeight(3);
                    line(circle.x,circle.y,circle.x+8,circle.y-13);
                    line(circle.x,circle.y,circle.x-8,circle.y-13);
                    line(circle.x,circle.y,circle.x,circle.y-30);
                    noStroke();
                    text(circle.hasLoadInY, circle.x+5,circle.y-30);
                }if (circle.hasLoadInY>0){//load in negative Y direction
                    stroke('#429bf4');
                    strokeWeight(3);
                    line(circle.x,circle.y,circle.x+8,circle.y+13);
                    line(circle.x,circle.y,circle.x-8,circle.y+13);
                    line(circle.x,circle.y,circle.x,circle.y+30);
                    noStroke();
                    text(circle.hasLoadInY, circle.x+5,circle.y+30);
                }
            }
		}
	}
    if (members.length > 0) {
		for (i = 0; i < members.length; i++) {
			var member = members[i];
            stroke(member.color);
            strokeWeight(member.strokeWeight);
			line(circles[member.lineStart].x, circles[member.lineStart].y, circles[member.lineEnd].x, circles[member.lineEnd].y);
            member.length=calcLength(member.lineStart,member.lineEnd);
            centerX = (circles[member.lineStart].x+circles[member.lineEnd].x)/2;
            centerY = (circles[member.lineStart].y+circles[member.lineEnd].y)/2;
            noStroke();
            var w = textWidth(String(Math.round(parseFloat(member.length)*100)/100));
            fill('#f4f4f4');
            stroke(0);
            rect(centerX-5, centerY-15, w+10, 20);
            noStroke();
            fill(0);
            text(String(Math.round(parseFloat(member.length)*100)/100),centerX,centerY);
		}
	}

}//End of Draw function
var firstPress = 1, lineStart, lineEnd;
// Run when the mouse/touch is down.
function mousePressed() {
    for (i = 0; i < circles.length; i++) {
        circles[i].active=false;
        circles[i].color = '#000';
    }
    if (mouseButton=="left"){
        nodeClicked();            
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
                            addNodePermit = false;
                            break;
                        } else {
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
                        circleProps["hasLoadInX"]=0;
                        circleProps["hasLoadInY"]=0;
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
                            memberProps['length']=calcLength(lineStart,lineEnd);
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
                        drawSupportAt(circleInd,supportOptions.value(),[1,2]);
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
    if(radio.value()=="Load")
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

                    if (loadOptions.value()=="Load in X direction"){
                        drawLoadAt(i,1,loadInp.value());
                        break;
                    }
                    else if (loadOptions.value()=="Load in Y direction"){
                        drawLoadAt(i,2,loadInp.value());
                        break;
                    }
                    else if (loadOptions.value()=="Remove Load"){
                        drawLoadAt(i,0,0);//for removing load the last argument is dummy. which means it is not being used.
                        break;
                    }
                }
           }
        }
    } 
  // Prevent default functionality.
  //return false;
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