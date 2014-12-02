(function($){
	var canvas = document.getElementById('canvas');
	if(canvas && canvas.getContext){
		init()
	}
	$(window).resize(function() {
		if(canvas && canvas.getContext){
			init()
		}
	})
	//window.onload = init();
	function init(){
		 context = canvas.getContext('2d');
		 canvas.height = window.innerHeight;
		 canvas.width = window.innerWidth;
	  	 mouse = {x:0,y:0};
	     colors = ['#af0','#7CD14E','#1CDCFF','#FFFF00','#FF0000','#aee137','#bef202','#00b2ff','#7fff24','#13cd4b','#c0fa38','#f0a','#a0f','#0af','#000000'];
		 canvas.addEventListener('mousemove',MouseMove,false);
		 canvas.addEventListener('mousedown',MouseDown,false);
		 canvas.addEventListener('mouseup',MouseUp,false);
		 window.addEventListener('resize',canvasResize,false);
	     dotsHolder = [];
	     mouseMove = false;
	     mouseDown = false;
	     for(i = 0;i < 1000;i++){
	        dotsHolder.push(new dots()); 
	     }
  
	  /*REQUEST ANIMATION FRAME*/
	    (function() {
		    var lastTime = 0;
		    var vendors = ['ms', 'moz', 'webkit', 'o'];
		    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		    }
		 
		    if (!window.requestAnimationFrame){
		        window.requestAnimationFrame = function(callback, element) {
		            var currTime = new Date().getTime();
		            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
		              timeToCall);
		            lastTime = currTime + timeToCall;
		            return id;
		        };
		    }
		    if (!window.cancelAnimationFrame){
		        window.cancelAnimationFrame = function(id) {
		            clearTimeout(id);
		        }
		    }
	    }())
    }
	function canvasResize(event){
		 canvas.height = window.innerHeight;
		 canvas.width = window.innerWidth;
		 cancelAnimationFrame(animate);
	}

	function MouseUp(event){ 
		if(mouseMove){
	  		mouseMove = false;
	  	}  
	    if(mouseDown){
	      mouseDown = false;
	    }
	}

	function MouseDown(event){ 
      mouseDown = true;
    }

    function MouseMove(event){
        mouse.x = event.pageX - canvas.offsetLeft;
        mouse.y = event.pageY - canvas.offsetTop;
	    if(mouseMove){
	     context.lineTo(mouseX,mouseY);
	     context.stroke(); 
	    }
  	}

	function dots(){
		 this.xPos = Math.random()*canvas.width;
		 this.yPos = Math.random()*canvas.height;
		 this.color = colors[Math.floor(Math.random()*colors.length)];
		 this.radius = Math.random()*10; 
		 this.vx = Math.cos(this.radius);
		 this.vy = Math.sin(this.radius);
		 this.stepSize = Math.random() / 10;
		 this.step = 0;
		 this.friction = 7;
		 this.speedX = this.vx;
		 this.speedY = this.vy;
	} 

    dots.draw = function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		for(var c = 0; c < dotsHolder.length;c++){
		  dot = dotsHolder[c]; 
		  context.beginPath();
		  distanceX = dot.xPos - mouse.x;
		  distanceY = dot.yPos - mouse.y;
		  var particleDistance =  Math.sqrt(distanceX*distanceX + distanceY*distanceY);
		  var particleMouse = Math.max( Math.min( 75 / ( particleDistance /dot.radius ), 7 ), 1 );
		  context.fillStyle = dot.color;
		  dot.xPos += dot.vx;
		  dot.yPos += dot.vy;
		 if(dot.xPos < -50) {dot.xPos = canvas.width+50;}
		 if(dot.yPos < -50) {dot.yPos = canvas.height+50;}
		 if(dot.xPos > canvas.width+50) {dot.xPos = -50;}
		 if(dot.yPos > canvas.height+50) {dot.yPos = -50;}
		 context.arc(dot.xPos,dot.yPos,(dot.radius/2.5)*particleMouse,0,2*Math.PI,false);
		 context.fill();
		 if(mouseDown){
		    var minimumDistance = 164,
		    distance = Math.sqrt((dot.xPos - mouse.x) * (dot.xPos - mouse.x) + (dot.yPos - mouse.y) * (dot.yPos - mouse.y)),
		    distanceX = dot.xPos - mouse.x,
		    distanceY = dot.yPos - mouse.y; 
		    if (distance < minimumDistance) {
		        var forceFactor = minimumDistance / (distance * distance),
		            xforce = (mouse.x - dot.xPos) % distance/7,
		            yforce = (mouse.y - dot.yPos) % distance/dot.friction,
		            forceField = forceFactor * 2/dot.friction;
		        dot.vx -= forceField * xforce;
		        dot.vy -= forceField * yforce;
		    }
			if(dot.vx > dot.speed){
			     dot.vx = dot.speed/dot.friction; 
			     dot.vy = dot.speed/dot.friction;
			}else if (dot.vy > dot.speed){
			    dot.vy = dot.speed/dot.friction;  
			}
		 }
 	  }
  
  }

   function animate(){
	  requestAnimationFrame(animate);
	  dots.draw();
   }
   if(canvas && canvas.getContext){
	 animate();
   }
})(jQuery)