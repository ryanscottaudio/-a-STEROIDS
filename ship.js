(function(){
  window.Asteroids = window.Asteroids || {};
  var Ship = window.Asteroids.Ship = function(options){
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      speed: 0,
      angle: 0,
      game: options.game,
      wrappable: true
    })
    this.orientation = 0;
    this.vel = Asteroids.Util.calcVec(this.speed, this.orientation);
  }
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject)
  Ship.RADIUS = 20;
  Ship.COLOR = '#00f';

  Ship.prototype.relocate = function () {
    this.game.lives -= 1;
    if (this.game.lives <= 0) {
      this.game.end();
      return;
    }
    this.pos = Asteroids.Game.randomPosition();
    this.speed = 0;
    this.vel = Asteroids.Util.calcVec(this.speed, this.orientation);
  };

  Ship.prototype.power = function (speed) {
    this.newSpeed = speed;
    this.newVel = Asteroids.Util.calcVec(this.newSpeed, this.angle)
  };

  Ship.prototype.turn = function (angle) {
    this.angle += angle;
  };

  Ship.prototype.drawExhaust = function (ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(this.pos[0] - Math.cos(this.angle) * 5, this.pos[1] - Math.sin(this.angle) * 5);
    ctx.lineTo(this.pos[0] + Math.cos(this.angle - ((2.5 * Math.PI) / 3)) * 25,
      this.pos[1] + Math.sin(this.angle - ((2.5 * Math.PI) / 3)) * 25);
    ctx.lineTo(this.pos[0] + Math.cos(this.angle + ((2.5 * Math.PI) / 3)) * 25,
      this.pos[1] + Math.sin(this.angle + ((2.5 * Math.PI) / 3)) * 25);
    ctx.closePath();
    ctx.fill();
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0], this.pos[1]],
      speed: 10,
      angle: this.angle,
      game: this.game,
      wrappable: false
    });
    this.game.add(bullet);
  };

  Ship.prototype.move = function(ctx) {
    if (this.newVel) {
      this.drawExhaust(ctx);
      this.vel[0] = this.vel[0] + this.newVel[0]
      this.vel[1] = this.vel[1] + this.newVel[1]
      this.newVel = null;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = Asteroids.Game.wrap(this.pos);
  };

  Ship.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + Math.cos(this.angle) * this.radius, this.pos[1] + Math.sin(this.angle) * this.radius);
    ctx.lineTo(this.pos[0] + Math.cos(this.angle - ((2.25 * Math.PI) / 3)) * this.radius,
      this.pos[1] + Math.sin(this.angle - ((2.25 * Math.PI) / 3)) * this.radius);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + Math.cos(this.angle + ((2.25 * Math.PI) / 3)) * this.radius,
      this.pos[1] + Math.sin(this.angle + ((2.25 * Math.PI) / 3)) * this.radius);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFF';
    ctx.stroke();
  };

})();
