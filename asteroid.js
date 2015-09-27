(function() {
  window.Asteroids = window.Asteroids || {};
  var Asteroid = window.Asteroids.Asteroid = function(hash) {
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      vel: Asteroids.Util.randomVec(Asteroid.VEL),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: hash['game'],
      wrappable: true
    });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = '#999';
  Asteroid.RADIUS = 10;
  Asteroid.VEL = 5;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    };
  };

})();
