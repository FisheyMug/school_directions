let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img= new Image();
img.src = "sprite.png"; 


// variables for moving
let spriteX = 533;
let spriteY = 369;
let faceDirection;
let up = 1;
let left= 2
let right = 3;
let down = 0;

//variables for places and goal
let favouritePlace= "classroom";
const playgroundX1= 22;
const playgroundY1=123;
const playgroundX2= 129;
const playgroundY2=256;
//x position from left to right 1-6 starting with gym/nures and ending with music/library
const gymX1= 190;
const gymX2=292;
const classroomX2=402;
const lunchroomX2=506;
const scienceX2=611;
const cookingX2=716;
const musicX2=821;
//y position starting top
const topRoomY1=27;
const topRoomY2=148;
const midRoomY1=218;
const midRoomY2=342;
const botRoomY2=465;

// variables for "walking" positions
const startX= 533;
const startY=369;
const y2= 256;
const yMain= 162;
const xRight1 =634;
const xRight2 = 748;
const xLeft1= 432;
const xLeft2= 325;
const xLeft3= 227;
const xLeft4= 144;


// variables for animation scaling/maths
const scale = 3;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

//does the sprite sheet maths for us
// credit/tutorial used to figure this out---https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
function drawFrame (frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY*height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

//event listeners for buttons and keys and variables needed to use them;
const straightBtn = document.querySelector('#straight');
const rightBtn = document.querySelector('#right');
const leftBtn = document.querySelector('#left');
const sentanceBox = document.getElementById("sentance")

//sentanceBox.innerHTML = "This is my favorite place! <br>" + "The " + favouritePlace;

straightBtn.addEventListener("click", () => {
    move(straight)});
rightBtn.addEventListener("click", () => {
  move(right)
});
leftBtn.addEventListener("click", () => {
  move(left)
});
document.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp"){
      move(straight);
    }
    else if (event.key === "ArrowLeft") {
        move(left)
    }
    else if (event.key === "ArrowRight") {
        move(right)
    }
  });

//event listeners for canvas
canvas.addEventListener('mousemove', (e) => {
    roomHover(canvas, e)
  })
canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e)
    roomSelect(canvas, e)
  })


// functions to help firgure things out

//function to help figure out canvas coordinates
const getCursorPosition = (canvas, event) => {
    const x = event.offsetX
    const y = event.offsetY
    console.log(x, y)
  }

  //room hover
function roomHover(canvas, event) {
   
    const x = event.offsetX
    const y = event.offsetY
    //top rooms and playground
    const pGOverlapX= (x>=playgroundX1 && x<=playgroundX2)
    const pGOverlapY = (y>=playgroundY1&& y<=playgroundY2)
    const gymOverlapX = (x>=gymX1 && x<=gymX2)
    const gymOverlapY= (y>=topRoomY1 && y<=topRoomY2)
    const classOverlapX= (x>gymX2 && x<classroomX2)
    const classOverlapy= (y>topRoomY1 && y< topRoomY2)
    const lunchOverlapX= (x>=classroomX2 && x<= lunchroomX2) 
    const lunchOverlapY= (y>topRoomY1 && y< topRoomY2)
    const scienceOverlapX = (x>=lunchroomX2 && x<= scienceX2)
    const scienceOverlapY= (y>topRoomY1 && y< topRoomY2)
    const cookingOverlapX=(x>=scienceX2 && x<=cookingX2)
    const cookingOverlapY=(y>topRoomY1 && y< topRoomY2)
    const musicOverlapX=(x>=cookingX2&& x<=musicX2)
    const musicOverlapY=(y>topRoomY1 && y< topRoomY2)
    // middle rooms
    const nurseOverlapX=(x>=gymX1 && x<=gymX2)
    const nurseOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const compOverlapX=(x>=gymX2 && x<=classroomX2)
    const compOverlapY=(y>=midRoomY1 && y<=midRoomY2)
    const artOverlapX=(x>=classroomX2 && x<= lunchroomX2)
    const artOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const pOfficeOverlapX=(x>=scienceX2 && x<=cookingX2)
    const pOfficeOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const libraryOverlapX=(x>=cookingX2&& x<=musicX2)
    const libraryOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    //bottom rooms
    const sOfficeOverlapX=(x>=classroomX2 && x<= lunchroomX2)
    const sOfficeOverlapY=(y>=midRoomY2 && y<=botRoomY2)
    const tOfficeOverlapX=(x>=scienceX2 && x<=cookingX2)
    const tOfficeOverlapY=(y>=midRoomY2 && y<=botRoomY2)

    if (pGOverlapX && pGOverlapY) {
        canvas.style="cursor: pointer;"  
        // ctx.strokeRect(playgroundX1,playgroundY1, 105, 130);
    } else if (gymOverlapX && gymOverlapY) {
        canvas.style="cursor: pointer;"  
        // ctx.strokeRect(gymX1, topRoomY1, 101, 123)
    } else if (classOverlapX&& classOverlapy) {
        canvas.style="cursor: pointer;" 
        // ctx.strokeRect(gymX2, topRoomY1, 101, 123) 
    } else if (lunchOverlapX&&lunchOverlapY){
        canvas.style="cursor: pointer;" 
    } else if (scienceOverlapX&& scienceOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (cookingOverlapX && cookingOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (musicOverlapX && musicOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (nurseOverlapX && nurseOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (compOverlapX && compOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (artOverlapX && artOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (pOfficeOverlapX && pOfficeOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (libraryOverlapX && libraryOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (sOfficeOverlapX && sOfficeOverlapY) {
        canvas.style="cursor: pointer;" 
    } else if (tOfficeOverlapX && tOfficeOverlapY) {
        canvas.style="cursor: pointer;" 
    }
    else {
        canvas.style="cursor: cursor;" ;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame(0, faceDirection, spriteX, spriteY)
    }
}



///// start of the game functions

window.onload = function() {
    init();
};

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    faceDirection=up;
    drawFrame (0, up, spriteX, spriteY);
}


// movement
function move(direction) {
    //right
    if (direction ==right) {
        if (faceDirection == up) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection = right;
        drawFrame (0, right, spriteX, spriteY);
        }
        else if (faceDirection == right) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection = down;
        drawFrame (0, down, spriteX, spriteY); 
        }
        else if (faceDirection == down) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection =left;
        drawFrame (0, left, spriteX, spriteY); 
        }
        else if (faceDirection == left) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection =up;
        drawFrame (0, up, spriteX, spriteY); 
        }
    }

    // left
    if (direction == left) {
        if (faceDirection == up) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection = left;
        drawFrame (0, left, spriteX, spriteY);
        }
        else if (faceDirection == right) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =up;
        drawFrame (0, up, spriteX, spriteY);
        }
        else if (faceDirection == down) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =right;
        drawFrame (0, right, spriteX, spriteY);
        }
        else if (faceDirection == left) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =down;
        drawFrame (0, down, spriteX, spriteY);
        }
    }

    // straight

    if (direction == straight) {
        if (spriteX== startX) {
            if (spriteY== startY&& spriteX==startX) {
                if (faceDirection==up) {
                    spriteY=y2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, up, spriteX, spriteY)
                }
                else if (faceDirection==right) {
                    spriteX +=100;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, right, spriteX, spriteY)
                }
                else if (faceDirection==down) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, down, spriteX, spriteY)
                }
                else if (faceDirection==left) {
                    spriteX-=100;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, left, spriteX, spriteY)
                }
            } else if (spriteY == y2 && spriteX==startX) {
                if (faceDirection==up) {
                    spriteY= yMain;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, up, spriteX, spriteY)
                }
                else if (faceDirection== right) {
                    spriteX +=100;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, right, spriteX, spriteY)
                }
                else if (faceDirection == down) {
                    spriteY = startY;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, down, spriteX, spriteY)
                }
                else if (faceDirection== left) {
                    spriteX-=100;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, left, spriteX, spriteY)
                }
            } else if (spriteY == yMain && spriteX==startX) {
                if (faceDirection== up) {
                    spriteY -= 100;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, up, spriteX, spriteY)
                }
                else if (faceDirection==right) {
                    spriteX=xRight1;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, right, spriteX, spriteY)
                }
                else if (faceDirection== down) {
                    spriteY=y2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, down, spriteX, spriteY)
                }
                else if (faceDirection== left) {
                    spriteX=xLeft1;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame (0, left, spriteX, spriteY)
                }
            }
        } else if (spriteX==xRight1) {
            if (faceDirection== up) {
                spriteY-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX=xRight2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                spriteY+=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX=533;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        } else if (spriteX==xRight2) {
            if (faceDirection== up) {
                spriteY-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX=xRight2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                spriteY+=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX=xRight1;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        } else if (spriteX==xLeft1) {
            if (faceDirection== up) {
                spriteY-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX=startX;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                spriteY+=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX=xLeft2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        } else if (spriteX == xLeft2) {
            if (faceDirection== up) {
                spriteY-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX=xLeft1;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                spriteY+=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX=xLeft3;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        } else if (spriteX == xLeft3) {
            if (faceDirection== up) {
                spriteY-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX=xLeft2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                spriteY+=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX=xLeft4;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        } else if (spriteX== xLeft4) {
            if (faceDirection== up) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, up, spriteX, spriteY)
            }
            else if (faceDirection==right){
                spriteX= xLeft3;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, right, spriteX, spriteY)
            }
            else if (faceDirection==down) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, down, spriteX, spriteY)
            }
            else if (faceDirection==left){
                spriteX-=100;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawFrame (0, left, spriteX, spriteY)
            }
        }
    }
    roomDetection();
}

function roomSelect(canvas, event) {
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 10;
    const x = event.offsetX
    const y = event.offsetY
    //top rooms and playground
    const pGOverlapX= (x>=playgroundX1 && x<=playgroundX2)
    const pGOverlapY = (y>=playgroundY1&& y<=playgroundY2)
    const gymOverlapX = (x>=gymX1 && x<=gymX2)
    const gymOverlapY= (y>=topRoomY1 && y<=topRoomY2)
    const classOverlapX= (x>gymX2 && x<classroomX2)
    const classOverlapy= (y>topRoomY1 && y< topRoomY2)
    const lunchOverlapX= (x>=classroomX2 && x<= lunchroomX2) 
    const lunchOverlapY= (y>topRoomY1 && y< topRoomY2)
    const scienceOverlapX = (x>=lunchroomX2 && x<= scienceX2)
    const scienceOverlapY= (y>topRoomY1 && y< topRoomY2)
    const cookingOverlapX=(x>=scienceX2 && x<=cookingX2)
    const cookingOverlapY=(y>topRoomY1 && y< topRoomY2)
    const musicOverlapX=(x>=cookingX2&& x<=musicX2)
    const musicOverlapY=(y>topRoomY1 && y< topRoomY2)
    // middle rooms
    const nurseOverlapX=(x>=gymX1 && x<=gymX2)
    const nurseOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const compOverlapX=(x>=gymX2 && x<=classroomX2)
    const compOverlapY=(y>=midRoomY1 && y<=midRoomY2)
    const artOverlapX=(x>=classroomX2 && x<= lunchroomX2)
    const artOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const pOfficeOverlapX=(x>=scienceX2 && x<=cookingX2)
    const pOfficeOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    const libraryOverlapX=(x>=cookingX2&& x<=musicX2)
    const libraryOverlapY=(y>=midRoomY1&& y<=midRoomY2)
    //bottom rooms
    const sOfficeOverlapX=(x>=classroomX2 && x<= lunchroomX2)
    const sOfficeOverlapY=(y>=midRoomY2 && y<=botRoomY2)
    const tOfficeOverlapX=(x>=scienceX2 && x<=cookingX2)
    const tOfficeOverlapY=(y>=midRoomY2 && y<=botRoomY2)

    if (pGOverlapX && pGOverlapY) {
       favouritePlace="playground"  
       ctx.strokeRect(playgroundX1,playgroundY1, 105, 130); 
    } else if (gymOverlapX && gymOverlapY) {
        favouritePlace="gym"
        ctx.strokeRect(gymX1, topRoomY1, 101, 123)
    } else if (classOverlapX&& classOverlapy) {
        favouritePlace="classroom" 
        ctx.strokeRect(gymX2, topRoomY1, 101, 123) 
    } else if (lunchOverlapX&&lunchOverlapY){
        favouritePlace = "lunch room"
        ctx.strokeRect(classroomX2, topRoomY1, 101, 123)
    } else if (scienceOverlapX&& scienceOverlapY) {
        favouritePlace="science room"
        ctx.strokeRect(lunchroomX2, topRoomY1, 101, 123)
    } else if (cookingOverlapX && cookingOverlapY) {
        favouritePlace="cooking room"
        ctx.strokeRect(scienceX2, topRoomY1, 101, 123)
    } else if (musicOverlapX && musicOverlapY) {
        favouritePlace="music room"
        ctx.strokeRect(cookingX2, topRoomY1, 101, 123)
    } else if (nurseOverlapX && nurseOverlapY) {
        favouritePlace="school nurse's office"
        ctx.strokeRect(gymX1, midRoomY1, 101, 123)
    } else if (compOverlapX && compOverlapY) {
        favouritePlace="computer room"
        ctx.strokeRect(gymX2, midRoomY1, 101, 123)
    } else if (artOverlapX && artOverlapY) {
        favouritePlace="arts and crafts room"
        ctx.strokeRect(classroomX2, midRoomY1, 101, 123)
    } else if (pOfficeOverlapX && pOfficeOverlapY) {
        favouritePlace="school principal's office"
        ctx.strokeRect(scienceX2, midRoomY1, 101, 123)
    } else if (libraryOverlapX && libraryOverlapY) {
        favouritePlace="library"
        ctx.strokeRect(cookingX2, midRoomY1, 101, 123)
    } else if (sOfficeOverlapX && sOfficeOverlapY) {
        favouritePlace="school office"
        ctx.strokeRect(classroomX2, midRoomY2, 101, 123)
    } else if (tOfficeOverlapX && tOfficeOverlapY) {
        favouritePlace="teachers office"
        ctx.strokeRect(scienceX2, midRoomY2, 101, 123)
    }
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame(0, faceDirection, spriteX, spriteY)
    }, 1000);
}

function roomDetection(canvas, event) {
    //top rooms and playground
    const pGOverlapX= (spriteX>=playgroundX1 && spriteX<=playgroundX2)
    const pGOverlapY = (spriteY>=playgroundY1&& spriteY<=playgroundY2)
    const gymOverlapX = (spriteX>=gymX1 && spriteX<=gymX2)
    const gymOverlapY= (spriteY>=topRoomY1 && spriteY<=topRoomY2)
    const classOverlapX= (spriteX>gymX2 && spriteX<classroomX2)
    const classOverlapy= (spriteY>topRoomY1 && spriteY< topRoomY2)
    const lunchOverlapX= (spriteX>=classroomX2 && spriteX<= lunchroomX2) 
    const lunchOverlapY= (spriteY>topRoomY1 && spriteY< topRoomY2)
    const scienceOverlapX = (spriteX>=lunchroomX2 && spriteX<= scienceX2)
    const scienceOverlapY= (spriteY>topRoomY1 && spriteY< topRoomY2)
    const cookingOverlapX=(spriteX>=scienceX2 && spriteX<=cookingX2)
    const cookingOverlapY=(spriteY>topRoomY1 && spriteY< topRoomY2)
    const musicOverlapX=(spriteX>=cookingX2&& spriteX<=musicX2)
    const musicOverlapY=(spriteY>topRoomY1 && spriteY< topRoomY2)
    // middle rooms
    const nurseOverlapX=(spriteX>=gymX1 && spriteX<=gymX2)
    const nurseOverlapY=(spriteY>=midRoomY1&& spriteY<=midRoomY2)
    const compOverlapX=(spriteX>=gymX2 && spriteX<=classroomX2)
    const compOverlapY=(spriteY>=midRoomY1 && spriteY<=midRoomY2)
    const artOverlapX=(spriteX>=classroomX2 && spriteX<= lunchroomX2)
    const artOverlapY=(spriteY>=midRoomY1&& spriteY<=midRoomY2)
    const pOfficeOverlapX=(spriteX>=scienceX2 && spriteX<=cookingX2)
    const pOfficeOverlapY=(spriteY>=midRoomY1&& spriteY<=midRoomY2)
    const libraryOverlapX=(spriteX>=cookingX2&& spriteX<=musicX2)
    const libraryOverlapY=(spriteY>=midRoomY1&& spriteY<=midRoomY2)
    //bottom rooms
    const sOfficeOverlapX=(spriteX>=classroomX2 && spriteX<= lunchroomX2)
    const sOfficeOverlapY=(spriteY>=midRoomY2 && spriteY<=botRoomY2)
    const tOfficeOverlapX=(spriteX>=scienceX2 && spriteX<=cookingX2)
    const tOfficeOverlapY=(spriteY>=midRoomY2 && spriteY<=botRoomY2)

    if (pGOverlapX && pGOverlapY) {
        if (favouritePlace=="playground") {
            win()
        } else reset();
    } else if (gymOverlapX && gymOverlapY) {
        if (favouritePlace=="gym") {
            win()
        } else reset();
    } else if (classOverlapX&& classOverlapy) {
        if (favouritePlace=="classroom") {
            win()
        } else reset();
    } else if (lunchOverlapX&&lunchOverlapY){
        if (favouritePlace=="lunch room") {
            win()
        } else reset();
    } else if (scienceOverlapX&& scienceOverlapY) {
        if (favouritePlace=="science room") {
            win()
        } else reset();
    } else if (cookingOverlapX && cookingOverlapY) {
        if (favouritePlace=="cooking room") {
            win()
        } else reset();
    } else if (musicOverlapX && musicOverlapY) {
        if (favouritePlace=="music room") {
            win()
        } else reset();
    } else if (nurseOverlapX && nurseOverlapY) {
        if (favouritePlace=="school nurse's office") {
            win()
        } else reset();
    } else if (compOverlapX && compOverlapY) {
        if (favouritePlace=="computer room") {
            win()
        } else reset();
    } else if (artOverlapX && artOverlapY) {
        if (favouritePlace=="arts and crafts room") {
            win()
        } else reset();
    } else if (pOfficeOverlapX && pOfficeOverlapY) {
        if (favouritePlace=="school principal's office") {
            win()
        } else reset();
    } else if (libraryOverlapX && libraryOverlapY) {
        if (favouritePlace=="library") {
            win()
        } else reset();
    } else if (sOfficeOverlapX && sOfficeOverlapY) {
        if (favouritePlace=="school office") {
            win()
        } else reset();
    } else if (tOfficeOverlapX && tOfficeOverlapY) {
        if (favouritePlace=="teachers office") {
            win()
        } else reset();
    }
}

function win(){
    drawStar(447,270,5,250,125);
    ctx.font="75px Times New Roman"
    ctx.fillStyle="black"
    ctx.fillText("You did it!", 290, 260)
    setTimeout(()=>{reset()},3000)
}

function reset() {
    spriteX=startX;
    spriteY=startY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    faceDirection=up;
    drawFrame (0, up, spriteX, spriteY);
}

function drawStar(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;
      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
          x=cx+Math.cos(rot)*outerRadius;
          y=cy+Math.sin(rot)*outerRadius;
          ctx.lineTo(x,y)
          rot+=step
  
          x=cx+Math.cos(rot)*innerRadius;
          y=cy+Math.sin(rot)*innerRadius;
          ctx.lineTo(x,y)
          rot+=step
      }
    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='yellow';
    ctx.stroke();
    ctx.fillStyle='gold';
    ctx.fill();
    }
  