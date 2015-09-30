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
    this.game.phase = "leveling";
    window.setTimeout(function() {
      this.game.phase = "playing";
      this.start();
    }.bind(this), 2500);
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
    this.game.addShip();
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function() {
    window.addEventListener('keydown', function(e) {
      e.preventDefault();

      var ship = this.game.ship;
      if (ship) {
        switch (e.keyIdentifier) {
          case "Up":
            ship.forward = true;
            break;
          case "Left":
            ship.left = true;
            break;
          case "Right":
            ship.right = true;
            break;
          case "U+0020":
            ship.fireBullet();
            break;
        }
      }
    }.bind(this))

    window.addEventListener('keyup', function(e) {
      e.preventDefault();

      var ship = this.game.ship;
      if (ship) {
        switch (e.keyIdentifier) {
          case "Up":
            ship.forward = false;
            break;
          case "Left":
            ship.left = false;
            break;
          case "Right":
            ship.right = false;
            break;
        }
      }
    }.bind(this))
  };

})();
