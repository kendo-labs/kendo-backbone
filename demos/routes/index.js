
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.demoPage = function(req, res){
  console.log(req);
  res.render('demos/' + req.params.demoName);
};
