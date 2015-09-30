(function() {
  window.Asteroids = window.Asteroids || {};
  var Explosion = window.Asteroids.Explosion = function(options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
    });
    this.radius = 0;
    this.transparency = 1;

    window.setTimeout(function() {
      this.fading = true;
    }.bind(this), 500);

    window.setTimeout(function() {
      this.game.remove(this);
    }.bind(this), 1000);
  };

  Asteroids.Util.inherits(Explosion, Asteroids.MovingObject);

  Explosion.COLOR = 'red';
  Explosion.RADIUS = 0;

  Explosion.prototype.draw = function(ctx){
    x = this.pos[0];
    y = this.pos[1];

    ctx.fillStyle = 'rgba(255, 0, 0, ' + this.transparency + ')';
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.radius,
      0,
      2 * Math.PI,
      false);
    ctx.fill();

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(255, 0, 0, ' + this.transparency + ')';
    ctx.stroke();

    this.radius += 2

    if (this.fading) {
      this.transparency -= .05;
    }
  };

  Explosion.prototype.move = function () {
  };

})();
