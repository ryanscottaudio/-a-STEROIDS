(function (){
  window.Asteroids = window.Asteroids || {};
  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Asteroids.Game(ctx);
    this.ctx = ctx;
    this.preventScroll();
    this.setUpListener();
    this.thruster = new Audio('thruster.wav');
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
    var level = new Audio('level.wav');
    level.play();
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
            this.thruster.play();
            break;
          case "Left":
            ship.left = true;
            break;
          case "Right":
            ship.right = true;
            break;
          case "U+0020":
            ship.shooting = true;
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
            this.fadeThruster();
            break;
          case "Left":
            ship.left = false;
            break;
          case "Right":
            ship.right = false;
            break;
          case "U+0020":
            ship.shooting = false;
            break;
        }
      }
    }.bind(this))
  };

  GameView.prototype.fadeThruster = function () {
    var interval = window.setInterval(function () {
      this.thruster.volume -= .05;
      if (this.thruster.volume <= .1) {
        this.thruster.pause();
        this.thruster.currentTime = 0;
        this.thruster.volume = 1;
        window.clearInterval(interval);
      };
    }.bind(this), 1);
  };

})();
