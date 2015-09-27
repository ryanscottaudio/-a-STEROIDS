(function (){
  window.Asteroids = window.Asteroids || {};
  var Game = window.Asteroids.Game = function() {
    this.ship = new Asteroids.Ship({game: this});
    this.objects = [this.ship];
    this.addAsteroids();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 5;

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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.objects.forEach(function(object){
      object.draw(ctx);
    });
  }

  Game.prototype.moveObjects = function () {
    this.objects.forEach(function(object){
      object.move();
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
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

  Game.wrap = function (pos) {
    pos[0] = (pos[0] + Game.DIM_X) % Game.DIM_X;
    pos[1] = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return pos;
  };

})();
