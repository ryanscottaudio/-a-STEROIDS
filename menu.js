(function (){
  window.Asteroids = window.Asteroids || {};
  var Menu = window.Asteroids.Menu = function(options) {
    this.game = options.game;
  };

  Menu.prototype.draw = function(ctx){
    if (this.game.phase === "before") {
      this.welcome(ctx);
    } else if (this.game.phase === "leveling") {
      this.levelShow(ctx);
    } else if (this.game.phase === "after") {
      this.gameOver(ctx);
    } else {
      this.hud(ctx);
    }
  };

  Menu.prototype.welcome = function (ctx) {
    ctx.font = '100px Avenir';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("(a)STEROIDS", ctx.canvas.width/2, 400);
    ctx.font = '50px Avenir';
    ctx.fillText("With each asteroid you destroy, your ship grows just a bit larger.", ctx.canvas.width/2, 600);
    ctx.fillText("Click anywhere to start.", ctx.canvas.width/2, 700);
  };

  Menu.prototype.gameOver = function (ctx) {
    ctx.font = '150px Avenir';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER.", ctx.canvas.width/2, ctx.canvas.height/2);
  };

  Menu.prototype.hud = function (ctx) {
    ctx.font = '50px Avenir';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText(this.game.lives + " Lives", 50, 100);
    ctx.textAlign = 'right'
    ctx.fillText("Level " + this.game.level, ctx.canvas.width - 50, 100);
  };

  Menu.prototype.levelShow = function (ctx) {
    ctx.font = '150px Avenir';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Level " + this.game.level, ctx.canvas.width/2, ctx.canvas.height/2);
  };

})();
