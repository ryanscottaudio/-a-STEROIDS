(function() {
  window.Asteroids = window.Asteroids || {};
  var Asteroid = window.Asteroids.Asteroid = function(options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos || Asteroids.Game.randomPosition(),
      angle: Math.random() * 2 * Math.PI,
      color: Asteroid.COLOR,
      game: options.game,
      wrappable: true,
    });
    this.broken = options.broken || false;
    this.setSpeedAndRadius(options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = '#999';
  Asteroid.RADIUS = 50;
  Asteroid.SPEED = 5;

  Asteroid.prototype.setSpeedAndRadius = function (options) {
    var random = Math.random();
    this.radius = options.radius || random * Asteroid.RADIUS + 20;
    this.speed = options.speed || (1 - random) * Asteroid.SPEED + this.game.level;
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship && !otherObject.protected) {
      var ship = otherObject;
      this.game.remove(ship);
      this.game.explode(ship.pos);
      ship.forward = false;
      ship.fadeThrusterSound();
      ship.alive = false;
      window.setTimeout(function() {
        this.game.objects.unshift(ship);
        ship.relocate();
        ship.radius = Asteroids.Ship.RADIUS;
      }.bind(this), 2000)
    };
  };

  Asteroid.prototype.draw = function(ctx){
    x = this.pos[0];
    y = this.pos[1];

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.radius,
      0,
      2 * Math.PI,
      false);
    ctx.fill();

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#666';
    ctx.stroke();
  };

})();
