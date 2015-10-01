(function(){
  window.Asteroids = window.Asteroids || {};
  var MovingObject = window.Asteroids.MovingObject = function(options){
    this.pos = options['pos'];
    this.speed = options['speed'];
    this.angle = options['angle'];
    this.color = options['color'];
    this.radius = options['radius'];
    this.game = options['game'];
    this.wrappable = options.wrappable;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius,
      this.angle - 2,
      this.angle + 2,
      false);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFF';
    ctx.stroke();
  };

  MovingObject.prototype.move = function() {
    this.vel = Asteroids.Util.calcVec(this.speed, this.angle)
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.wrappable === true) {
      this.pos = Asteroids.Game.wrap(this.pos);
    } else if (this.pos[0] > this.game.DIM_X ||
        this.pos[0] < 0 ||
        this.pos[1] > this.game.DIM_Y ||
        this.pos[1] < 0) {
      this.game.remove(this);
    };
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    return Asteroids.Util.distance(this.pos, otherObject.pos) < this.radius + otherObject.radius;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

})();
