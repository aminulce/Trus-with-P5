function radioChilds()
{

    if (radio.value() == "Load")
    {
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
// Define variables.
var radius = 7;
var circles = [];//curcles object
//var circles = [
//	{ x: 50, y: 50, color:' #000', active: false },
//	{ x: 150, y: 50, color: '#000', active: false },
//	{ x: 250, y: 50, color: '#000', active: false }
//]

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
}

// Draw on the canvas.
function draw() {
	background('#fff');
	if (circles.length > 0) {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];
			noStroke();
			fill(circle.color);
			ellipse(circle.x, circle.y, radius, radius);
		}
	}
}

// Run when the mouse/touch is down.
function mousePressed() {
    var addNodePermit = true;
    var circleProps = {};
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
                if (nodeOption.value() == "Add Node")
                {
                    if(addNodePermit == true)
                    {

                        circleProps["x"]=mouseX;
                        circleProps["y"]=mouseY;
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
	if (circles.length > 0) {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i],
					distance = dist(mouseX, mouseY, circle.x, circle.y);
			if (distance < radius) {
				circle.active = true;
				circle.color = '#f00';
			} else {
				circle.active = false;
				circle.color = '#000';
			}
		}
	}
  // Prevent default functionality.
  return false;
}

// Run when the mouse/touch is dragging.
function mouseDragged() {
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
                                circle.x = mouseX;
                                circle.y = mouseY;
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