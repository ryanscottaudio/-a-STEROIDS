(function() {
  window.Asteroids = window.Asteroids || {};
  var Bullet = window.Asteroids.Bullet = function(hash) {
    Asteroids.MovingObject.call(this, {
      pos: hash.pos,
      vel: hash.vel,
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      game: hash.game,
      wrappable: false
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.COLOR = '#000';
  Bullet.RADIUS = 5;

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    };
  };
})();
