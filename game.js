(function (){
  window.Asteroids = window.Asteroids || {};
  var Game = window.Asteroids.Game = function(ctx) {
    Game.DIM_X = ctx.canvas.width;
    Game.DIM_Y = ctx.canvas.height;
    this.phase = "before";
    this.level = 1;
    this.objects = [];
    this.addAsteroids();
    this.menu = new Asteroids.Menu({game: this});
    this.ctx = ctx;
  };

  Game.NUM_ASTEROIDS = 2;

  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship({game: this});
    this.objects.unshift(this.ship);
    this.lives = 5;
  };

  Game.prototype.add = function(obj) {
    this.objects.push(obj);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS + this.level; i++) {
      this.add(new Asteroids.Asteroid( {game: this} ));
    };
  };

  Game.prototype.addNewAsts = function (asteroid) {
    if (!asteroid.broken) {
      for (var i = 0; i < 3; i++) {
        var newAst = new Asteroids.Asteroid({
          game: this,
          pos: [asteroid.pos[0], asteroid.pos[1]],
          radius: asteroid.radius / 3,
          speed: asteroid.speed * 1.25,
          broken: true,
        });
        this.add(newAst);
      }
    }
  };

  Game.randomPosition = function () {
    return [Math.floor(Math.random() * Game.DIM_X), Math.floor(Math.random() * Game.DIM_Y)]
  };

  Game.prototype.draw = function(ctx) {
    ctx.fillStyle="#000";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    if (this.phase === "playing" || this.phase === "leveling") {
      this.menu.draw(ctx);
    }
    this.objects.forEach(function(object){
      object.draw(ctx);
    });
    if (this.phase === "before" || this.phase === "after") {
      this.menu.draw(ctx);
    }
  }

  Game.prototype.moveObjects = function (ctx) {
    this.objects.forEach(function(object){
      object.move(ctx);
    });
  };

  Game.prototype.step = function (ctx) {
    this.moveObjects(ctx);
    this.checkCollisions();
  };

  Game.prototype.checkCollisions = function(){
    var collided = [];
    for( var i = 0; i < this.objects.length - 1; i++){
      for( var j = i + 1; j < this.objects.length; j++){
        if( this.objects[i].isCollidedWith(this.objects[j]) ){
          collided.push( [this.objects[i], this.objects[j]] );
        };
      };
    };
    collided.forEach( function(pair) {
      pair[1].collideWith(pair[0]);
    });
  };

  Game.prototype.remove = function (ast) {
    this.objects.splice(this.objects.indexOf(ast), 1);

    if (ast instanceof Asteroids.Asteroid) {
      this.addNewAsts(ast);
      this.explode(ast.pos);
    }

    if (this.checkAst()) {
      this.nextLevel();
    }
  };

  Game.prototype.checkAst = function () {
    noAst = true;
    this.objects.forEach(function (obj) {
      if (obj instanceof Asteroids.Asteroid) {
        noAst = false;
      }
    });
    return noAst;
  };

  Game.prototype.nextLevel = function () {
    if (this.phase !== "leveling") {
      var level = new Audio('level.wav');
      level.play();
      this.level += 1;
      this.phase = "leveling";
      window.setTimeout(function() {
        this.ship.protect();
        this.addAsteroids();
        this.phase = "playing";
      }.bind(this), 2500);
    }
  };

  Game.prototype.end = function () {
    var end = new Audio('end.wav');
    end.play();
    this.phase = "after";
    this.objects.shift();
    this.ship = null;
    window.setTimeout(function() {
      window.location.reload();
    }, 5000);
  };

  Game.wrap = function (pos) {
    pos[0] = (pos[0] + Game.DIM_X) % Game.DIM_X;
    pos[1] = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return pos;
  };

  Game.prototype.explode = function (pos) {
    var boom = new Audio('boom.wav');
    boom.play();
    var explosion = new Asteroids.Explosion({
      pos: [pos[0], pos[1]],
      game: this,
    })
    this.add(explosion);
  };

})();
