var dx = 10;
var dy = 10;
var x = 0;
var y = 90;
var movement;
var strike = document.getElementById('strikes');
var max = document.getElementById('score');
var speed = 0; 
var sign;

function initialize()
{
  var obj1 = document.getElementById('ball');
  obj1.style.left = '0px';
  obj1.style.top = '90px';
  messages.innerHTML = " welcome to the game !! Please select the speed mode!! ";
}
if(Math.random()< 0.5)
{
sign = -1;
}
else
{
sign = 1;
}
 
var angle = Math.floor(Math.random()*((Math.PI/4)/180)*sign);
function startGame()
{
 messages.innerHTML = " Game started!!.. ";
 x = x + dx + angle;
 y = y + dy + angle;
 document.getElementById("ball").style.top = y + 'px';
 document.getElementById("ball").style.left = x + 'px';
 
if((y+dy < -85) || (y+dy > 401))// obtained those values by using showcoord function
 {
   dy *= -1;
 }

 if(x+dx < 0)// obtained those values by using showcoord function
 {
   dx *= -1;
 }
 
 var br = ball.getBoundingClientRect().right;
 var pl = paddle.getBoundingClientRect().left;
 var bt = ball.getBoundingClientRect().top;
 var pt = paddle.getBoundingClientRect().top;
 var bb = ball.getBoundingClientRect().bottom;
 var pb = paddle.getBoundingClientRect().bottom;
 
 if((br>=pl) && (bt>pt) && (bb<pb))
 {
  dx *= -1 ;
  strike++;
  strikes.innerHTML = strike;
 }

 movement = setTimeout(startGame,speed);

if(x+dx > 795)// obtained those values by using showcoord function
{
  clearInterval(movement);
  //document.getElementById("ball").style.visibility = "hidden";
  //alert(" GAME OVER!!!! ");
  resetGame();
  messages.innerHTML = " Game over!!.. ";
}

}
function resetGame()
{
if (strike> max)
{
 max = strike;
}
score.innerHTML = max;
strike=0;
strikes.innerHTML = strike;
initialize();
clearInterval(movement);
x =0;
y =90;
} 

function setSpeed(p)
{
if(p == 0)
{
 speed = 100;
}
if(p == 1)
{
 speed = 50;
}
if(p == 2 )
{
 speed == 30;
}
}

function movePaddle(e)
{
  var paddle = document.getElementById("paddle");
  if(e.clientY < 401)
  {
  paddle.style.top = e.clientY + 'px' ;
  }
}

/*function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("court").innerHTML = coords;
}*/