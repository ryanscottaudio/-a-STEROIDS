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
    this.sides = Math.floor(5 + Math.random() * 3);
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
      ship.shooting = false;
      ship.right = false;
      ship.left = false;
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

    var sides = this.sides;
    var size = this.radius;
    var Xcenter = this.pos[0];
    var Ycenter = this.pos[1];

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo (Xcenter + size * Math.cos(0), Ycenter + size *  Math.sin(0));
    for (var i = 1; i <= sides + 1;i += 1) {
        ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
    }
    ctx.fill();

    ctx.strokeStyle = "#666";
    ctx.lineWidth = 10;
    ctx.stroke();

  };

})();
