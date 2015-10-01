(function() {
  window.Asteroids = window.Asteroids || {};
  var Bullet = window.Asteroids.Bullet = function(options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      speed: options.speed,
      angle: options.angle,
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      game: options.game,
      wrappable: false,
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.COLOR = '#f00';
  Bullet.RADIUS = 5;

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
      this.game.ship.radius += 2.5;
    };
  };
})();
