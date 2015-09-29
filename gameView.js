(function (){
  window.Asteroids = window.Asteroids || {};
  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Asteroids.Game(ctx);
    this.ctx = ctx;
    this.preventScroll();
    this.setUpListener();
  };

  GameView.prototype.preventScroll = function() {
    window.addEventListener('mousewheel', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  };

  GameView.prototype.setUpListener = function() {
    listener = this.setUp.bind(this)
    window.addEventListener('mouseup', listener);
  };

  GameView.prototype.setUp = function() {
    window.removeEventListener('mouseup', listener);
    this.start();
  };

  GameView.prototype.menu = function() {
    var game = this.game;
    var ctx = this.ctx;
    setInterval(function(){
      game.draw(ctx);
      game.step(ctx);
    }, 1000 / 60);
  };

  GameView.prototype.start = function() {
    this.started = true;
    this.game.started = true;
    this.game.addShip();
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    // key('down', function(){ ship.power(-1) });
    key('up', function(){ ship.power(1) })
    key('left', function(){ ship.turn(-.5) });
    key('right', function(){ ship.turn(.5) });
    key('space', function(){ ship.fireBullet() });
  };

})();
