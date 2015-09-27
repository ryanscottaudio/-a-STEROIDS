(function(){
  window.Asteroids = window.Asteroids || {};
  var MovingObject = window.Asteroids.MovingObject = function(hash){
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.color = hash['color'];
    this.radius = hash['radius'];
    this.game = hash['game'];
    this.wrappable = hash.wrappable;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius,
      Asteroids.Util.angle(this.vel) - 2,
      Asteroids.Util.angle(this.vel) + 2,
      false);
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
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
