define(['../app', '../factory/User'],function(app, MathService){
  app.service('CalcService',function(MathService){
    this.square = function(a) {
      return MathService.multiply(a,a);
    }
  });
});
