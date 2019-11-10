const express = require('express');
const router = express.Router();

var Nobel = require('../controllers/nobel')

/* GET: lista de Nobel Prizes | listar os premios de uma categoria | listar os premios de uma categoria superior a um ano  */
router.get('/premios', function(req, res) {
  var cat = req.query.categoria
  var data = req.query.data
  if(cat){
    if(data){
      // listar os premios de uma categoria superior a um ano
      Nobel.premioCatYear(cat,data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else{
      //listar os premios de uma categoria 
      Nobel.premioCategoria(cat)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
  }
  else{
    // lista de Nobel Prizes
    Nobel.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
})

/* GET: consultar um Nobel Prize */
router.get('/premios/:id', function(req, res) {
  Nobel.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

/* GET: listar todas as categorias presentes nos Nobel Prizes  */
router.get('/categorias', function(req, res) {
    Nobel.categorias()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

/* GET: consultar um Nobel Prize */
router.get('/premios', function(req, res) {
  Nobel.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})



/* GET: consultar os laureados */
router.get('/laureados', function(req, res) {
  Nobel.laureados()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router