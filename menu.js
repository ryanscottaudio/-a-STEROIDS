(function (){
  window.Asteroids = window.Asteroids || {};
  var Menu = window.Asteroids.Menu = function(options) {
    this.game = options.game;
  };

  Menu.prototype.draw = function(ctx){
    if (!this.game.started && !this.game.over) {
      ctx.font = '100px Avenir';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText("(a)STEROIDS", ctx.canvas.width/2, 400);
      ctx.font = '50px Avenir';
      ctx.fillText("With each asteroid you destroy, you grow just a bit larger.", ctx.canvas.width/2, 600);
      ctx.fillText("Click anywhere to start.", ctx.canvas.width/2, 700);
    } else if (this.game.over) {
      ctx.font = '150px Avenir';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText("GAME OVER.", ctx.canvas.width/2, ctx.canvas.height/2);
    }  else {
      ctx.font = '50px Avenir';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(this.game.lives + " Lives", 50, 100);
      ctx.textAlign = 'right'
      ctx.fillText("Level " + this.game.level, ctx.canvas.width - 50, 100);
    }
  };
})();
