(function(){
  window.Asteroids = window.Asteroids || {};
  var Util = window.Asteroids.Util = function(){

  };

  Util.inherits = function(childClass, parentClass){
    function Surrogate() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function(length){
    var theta = Math.random() * 2 * Math.PI;
    return [ length * Math.cos(theta), length * Math.sin(theta) ];
  };

  Util.distance = function(pos1, pos2){
    return Math.sqrt(
      Math.pow(pos1[0]-pos2[0], 2) +
      Math.pow(pos1[1]-pos2[1], 2)
    );
  };

  Util.unitVector = function(vel) {
    var hypotenuse = Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
    return [vel[0] * 10 / hypotenuse, vel[1] * 10 / hypotenuse];
  };

  Util.angle = function(vel) {
    if (vel[0] === 0 && vel[1] === 0) {
      return -Math.PI / 2;
    } else if (vel[0] >= 0 && vel[1] > 0) {
      return Math.atan(vel[1]/vel[0]);
    } else if (vel[0] >= 0 && vel[1] <= 0) {
      return Math.atan(vel[1]/vel[0]);
    } else if (vel[0] <= 0 && vel[1] < 0) {
      return Math.atan(vel[1]/vel[0]) + Math.PI;
    } else if (vel[0] < 0 && vel[1] >= 0) {
      return Math.atan(vel[1]/vel[0]) + Math.PI;
    };
  };

})();
