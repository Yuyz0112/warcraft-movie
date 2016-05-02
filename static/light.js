/*========================================================*/  
/* Light Loader
/*========================================================*/
window.lightLoader = function(c, cw, ch){
	
	var _this = this;
	this.c = c;
	this.ctx = c.getContext('2d');
	this.cw = cw;
	this.ch = ch;			
	
	this.loaded = 0;
	this.loaderHeight = this.ch / 2;
	this.particles = [];
	this.particleLift = this.ch/2;
	this.hue = 30;
	this.gravity = .15;
	this.particleRate = 30;	
					
	/*========================================================*/	
	/* Initialize
	/*========================================================*/
	this.init = function(){
		this.loop();
	};
	
	/*========================================================*/	
	/* Utility Functions
	/*========================================================*/				
	this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
	this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
	
	
	/*========================================================*/	
	/* Particles
	/*========================================================*/
	this.Particle = function(){					
		this.x = _this.cw/2  - _this.rand(0, 1);
		this.y = _this.ch/2 + _this.rand(0,_this.loaderHeight)-_this.loaderHeight/2;
		this.vx = _this.rand(-_this.cw*2/5, _this.cw*2/5)/100;
		this.vy = (_this.rand(0,_this.particleLift)-_this.particleLift*2)/40;
		this.width = _this.rand(1,4)/1;
		this.height = _this.rand(1,4)/1;
		this.hue = _this.hue;
	};
	
	this.Particle.prototype.update = function(i){
		this.vx += (_this.rand(0,6)-3)/100; 
		this.vy += _this.gravity;
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.y > _this.ch){
			_this.particles.splice(i, 1);
		}					
	};
	
	this.Particle.prototype.render = function(){
		_this.ctx.fillStyle = 'hsla('+this.hue+', 100%, '+_this.rand(50,70)+'%, '+_this.rand(20,100)/100+')';
		_this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	this.createParticles = function(){
		var i = this.particleRate;
		while(i--){
			this.particles.push(new this.Particle());
		};
	};
					
	this.updateParticles = function(){					
		var i = this.particles.length;						
		while(i--){
			var p = this.particles[i];
			p.update(i);											
		};						
	};
	
	this.renderParticles = function(){
		var i = this.particles.length;						
		while(i--){
			var p = this.particles[i];
			p.render();											
		};					
	};
	

	/*========================================================*/	
	/* Clear Canvas
	/*========================================================*/
	this.clearCanvas = function(){
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.clearRect(0,0,this.cw,this.ch);					
		this.ctx.globalCompositeOperation = 'lighter';
	};
	
	/*========================================================*/	
	/* Animation Loop
	/*========================================================*/
	this.loop = function(){
		var loopIt = function(){
			requestAnimationFrame(loopIt, _this.c);

			_this.clearCanvas();
			
			_this.createParticles();
			
			_this.updateParticles();
			
			_this.renderParticles();
			
		};
		loopIt();		
	};

};