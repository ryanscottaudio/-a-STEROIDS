(function (){
  window.Asteroids = window.Asteroids || {};
  var Game = window.Asteroids.Game = function() {
    Game.DIM_X = ctx.canvas.width;
    Game.DIM_Y = ctx.canvas.height;
    this.started = false;
    this.over = false;
    this.objects = [];
    this.addAsteroids();
    this.menu = new Asteroids.Menu({game: this});
    ctx = ctx;
  };

  Game.NUM_ASTEROIDS = 5;

  Game.prototype.addShip = function() {
    this.ship = new Asteroids.Ship({game: this});
    this.objects.unshift(this.ship);
    this.lives = 5;
    this.level = 1;
  };

  Game.prototype.add = function(obj) {
    this.objects.push(obj);
  };

  Game.prototype.addAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid( {game: this} ));
    };
  };

  Game.randomPosition = function () {
    return [Math.floor(Math.random() * Game.DIM_X), Math.floor(Math.random() * Game.DIM_Y)]
  };

  Game.prototype.draw = function(ctx) {
    // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle="#000";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    if (this.started) {
      this.menu.draw(ctx);
    }
    this.objects.forEach(function(object){
      object.draw(ctx);
    });
    if (!this.started) {
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
  };

  Game.prototype.end = function () {
    this.over = true;
    this.started = false;
    this.objects.shift();
  };

  Game.wrap = function (pos) {
    pos[0] = (pos[0] + Game.DIM_X) % Game.DIM_X;
    pos[1] = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return pos;
  };

})();
