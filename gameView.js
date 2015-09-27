(function (){
  window.Asteroids = window.Asteroids || {};
  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    var game = this.game;
    var ctx = this.ctx;
    setInterval(function(){
      game.draw(ctx);
      game.step();
    }, 1000 / 60);
  }

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    key('down', function(){ ship.power([0, 1], this.cxt) });
    key('up', function(){ ship.power([0, -1]), this.cxt });
    key('left', function(){ ship.power([-1, 0]), this.cxt });
    key('right', function(){ ship.power([1, 0]), this.cxt });
    key('space', function(){ ship.fireBullet(), this.cxt });
  };

})();
