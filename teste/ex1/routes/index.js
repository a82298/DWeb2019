var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras')


/* GET home page. */
router.get('/obras', function(req, res, next) {
  var compositor = req.query.compositor
  var instrumento = req.query.instumento
  if(compositor){
    Obras.listarbyCompositor(compositor)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
  else if(instrumento){
    Obras.listarByInstrumento(instrumento)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    Obras.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }

  });


router.get('/obras/:id', function(req, res, next) {
    var id = req.params.id
    Obras.consultar(id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  
    });

router.get('/tipos', function(req, res, next) {
      var id = req.params.id
      Obras.listarTipos()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
    
 });

 
router.get('/obrasQuant', function(req, res, next) {
  var id = req.params.id
  Obras.listarObrasPartituras()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

  });

module.exports = router;
