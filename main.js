const canvas=document.getElementById("myCanvas");
const ctx=canvas.getContext("2d");
const Left=document.getElementById("leftButton");
const Right=document.getElementById("rightButton")

let x=canvas.width/2;
let y=canvas.height-30;
let dx=2;
let dy=-2;
let ballRadius=10;
let paddleHeight=10;
let paddleWidth=75;
let paddleX=(canvas.width-paddleWidth)/2;
let rightPressed=false;
let leftPressed=false;
let brickRowCount=9;
let brickColumnCount=4;
let brickWidth=75;
let brickHeight=20;
let brickPadding=10;
let brickOffsetTop=30;
let brickOffsetLeft=20;
let bricks=[];
let score=0;
let lives=3;



for (let i = 0; i < brickColumnCount; i++) {
  bricks[i]=[];
  for (let c = 0; c < brickRowCount; c++) {
    bricks[i][c]={x:0,y:0,status:1}  
  }
}


document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
//document.addEventListener("mousemove",mouseMoveHandler,false)
Left.addEventListener("touchstart",function(){
      leftPressed=true; 
});
Left.addEventListener("touchend",function(){
      leftPressed=false;
});
Right.addEventListener("touchstart", function(){
   rightPressed=true;

});
Right.addEventListener("touchend", function(){
   rightPressed=false;

});


function keyDownHandler(e){
  console.log(e)
    if(e.keyCode==39){
      rightPressed=true
    }
    else if(e.keyCode==37){
      leftPressed=true
    }
}
function keyUpHandler(e){
  console.log(e)
    if(e.keyCode==39){
      rightPressed=false
    }
    else if(e.keyCode==37){
      leftPressed=false
    }
}
function mouseMoveHandler(e){
  let relativeX=e.clientX-canvas.offsetLeft;
  if(relativeX>0&&relativeX<canvas.width){
    paddleX=relativeX-paddleWidth/2
  }
}
//отслеживание столкновения 
function collisionDetection(){
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r <brickRowCount ; r++) {
      let b=bricks[c][r];
      if(b.status==1){
        if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
          dy=-dy;
          b.status=0;
          score++;
          if(score==brickColumnCount*brickRowCount){
            alert(молодец)
            document.location.reload();
            clearInterval(interval);
          }
        }     
      }
      
    }
    
  }
}


function drawBricks(){
  for (let i = 0; i < brickColumnCount; i++) {
    for (let c = 0; c < brickRowCount; c++) {
      if(bricks[i][c].status==1){
      let brickX=(i*(brickWidth+brickPadding))+brickOffsetLeft;
      let brickY=(c*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[i][c].x=brickX;
      bricks[i][c].y=brickY;
      ctx.beginPath();
      ctx.rect(brickX,brickY,brickWidth,brickHeight);
      ctx.fillStyle="green";
      ctx.fill()
      ctx.closePath();
      }
    }
    
  }
}
function drawScore(){
  ctx.font="20px Arial";
  ctx.fillStyle="black";
  ctx.fillText("Score:"+score,8,20);
}

function drawPaddle(){
  ctx.beginPath()
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle="#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall(){
ctx.beginPath();
ctx.arc(x,y,ballRadius,0,Math.PI*2);
ctx.fillStyle="#0095DD";
ctx.fill();
ctx.closePath();
}
function drawLives(){
  ctx.font="20px Ariel";
  ctx.fillStyle="red"
  ctx.fillText("Lives:"+lives,canvas.width-80,20); 
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height)
drawScore();
drawLives();
drawBricks();
drawBall();
drawPaddle();
collisionDetection();

//проверка на столкновения:)
if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
  dx=-dx;
}
if(y+dy<ballRadius){
  dy=-dy;
}
else if((y+dy>canvas.height-ballRadius-paddleHeight)&& (x>paddleX && x<paddleX+paddleWidth)){
    dy=-dy;
    }

else if(y+dy>canvas.height-ballRadius){
    lives--;
    if(!lives){
      alert("Game Over");
    document.location.reload();
   clearInterval(interval);
    }
    else{
      x=canvas.width/2;
      y=canvas.height-30;
      dx=2;
      dy=-2;
      paddleX=(canvas.width-paddleWidth)/2
    }
    }





//управление
if(rightPressed&&paddleX<canvas.width-paddleWidth){
  paddleX+=3
}
if(leftPressed&&paddleX>0){
  paddleX-=3
}
x+=dx;
y+=dy;
}



//цикл
let interval=setInterval(draw,10);
