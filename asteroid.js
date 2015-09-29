(function() {
  window.Asteroids = window.Asteroids || {};
  var Asteroid = window.Asteroids.Asteroid = function(hash) {
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      angle: Math.random() * 2 * Math.PI,
      color: Asteroid.COLOR,
      game: hash['game'],
      wrappable: true
    });
    this.setSpeedAndRadius();
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = '#999';
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 3;

  Asteroid.prototype.setSpeedAndRadius = function () {
    var random = Math.random();
    this.radius = random * Asteroid.RADIUS + 10;
    this.speed = (1 - random) * Asteroid.SPEED + 2;
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
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
