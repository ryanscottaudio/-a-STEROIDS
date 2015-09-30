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
      wrappable: true,
    })
    this.forward = false;
    this.left = false;
    this.right = false;
    this.shooting = false;
    this.fireable = true;
    this.orientation = 0;
    this.protected = false;
    this.vel = Asteroids.Util.calcVec(this.speed, this.orientation);
    this.protect();
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
    this.protect();
  };

  Ship.prototype.drawExhaust = function (ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(this.pos[0] - Math.cos(this.angle) * 10, this.pos[1] - Math.sin(this.angle) * 10);
    ctx.lineTo(this.pos[0] + Math.cos(this.angle - ((2.5 * Math.PI) / 3)) * (this.radius + 10),
      this.pos[1] + Math.sin(this.angle - ((2.5 * Math.PI) / 3)) * (this.radius + 10));
    ctx.lineTo(this.pos[0] + Math.cos(this.angle + ((2.5 * Math.PI) / 3)) * (this.radius + 10),
      this.pos[1] + Math.sin(this.angle + ((2.5 * Math.PI) / 3)) * (this.radius + 10));
    ctx.closePath();
    ctx.fill();
  };

  Ship.prototype.fireBullet = function () {
    if (this.fireable) {
      var bullet = new Asteroids.Bullet({
        pos: this.nosePos(),
        speed: 20,
        angle: this.angle,
        game: this.game,
        wrappable: false,
      });
      this.game.add(bullet);
      this.fireable = false;
      window.setTimeout(function() {
        this.fireable = true;
      }.bind(this), 200)
    }
  };

  Ship.prototype.nosePos = function () {
    var pos = [this.pos[0], this.pos[1]];
    var addPos = Asteroids.Util.calcVec(this.radius, this.angle);
    pos[0] += addPos[0];
    pos[1] += addPos[1];
    return pos;
  };

  Ship.prototype.move = function(ctx) {
    if (this.forward) {
      this.newSpeed = .35;
      this.newVel = Asteroids.Util.calcVec(this.newSpeed, this.angle)
    }
    if (this.left) {
      this.angle += -.18;
    }
    if (this.right) {
      this.angle += .18;
    }

    if (this.shooting) {
      this.fireBullet();
    }

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

  Ship.prototype.protect = function () {
    this.protected = true;
    setTimeout(function() {
      this.protected = false;
    }.bind(this), 2000);
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
    ctx.strokeStyle = 'white';
    ctx.stroke();

    if (this.protected) {
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.75)';
      ctx.stroke();
    }
  };

})();
