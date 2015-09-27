(function(){
  window.Asteroids = window.Asteroids || {};
  var Ship = window.Asteroids.Ship = function(hash){
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0,0],
      game: hash["game"],
      wrappable: true
    })
  }
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject)
  Ship.RADIUS = 15;
  Ship.COLOR = '#00f';

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, cxt) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.drawExhaust(impulse, cxt);
  };

  Ship.prototype.drawExhaust = function (impulse, cxt) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] - impulse[0], this.pos[1]- impulse[1]);
    // ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.fill();
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0], this.pos[1]],
      vel: Asteroids.Util.unitVector(this.vel),
      game: this.game,
      wrappable: false
    });
    this.game.add(bullet);
  };

})();
