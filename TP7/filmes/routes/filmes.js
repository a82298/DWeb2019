var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')


/* GET home page. */
router.get('/', function(req, res) {
  Filmes.listar()
    .then(dados => res.render('index', {lista : dados}))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/favicon.ico', function(req, res){
  res.status(204)
})

router.get('/:idFilme', function(req, res){
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('filme-observar', {f : dados[0]}))
    .catch(erro => {res.render('Não foi possível carregar o filme pedido! ('+erro+')'); res.status(500)})
})

router.get('/update/:idFilme', function(req, res) {
  Filmes.consultar(req.params.idFilme)
    .then(dados =>  res.render('filme', {update : {} , f : dados[0]} ) )
    .catch(erro => {res.render('Não foi possível carregar o filme pedido! ('+erro+')'); res.status(500)})
})

router.get('.*', function(req, res){
  res.render('error', {error : "Não existe nenhum GET com '" + req.url +"' disponível!" })
  res.status(500)
})

router.delete('/:idFilme', function(req, res) {
  console.log('A tentar eliminar filme '+ req.params.idFilme)
  Filmes.remover(req.params.idFilme)
    .then(dados => res.json(0))
    .catch(erro => {res.render('error', {error : erro}) ; res.status(500).json(erro)})
})

router.delete('.*', function(req,res) {
  res.render('error', {error : "Não existe nenhum DELETE com '" + req.url +"' disponível!" })
  res.status(500)
})

router.post('/new', function(req, res){
   Filmes.adicionar(req.body)
      .then(dados => res.json('/filmes/'))
      .catch(erro => {res.render('error', {error : erro}) ; res.status(500).json(erro)  } )
})

router.post('.*', function(req, res){
  res.render('error', {error : "Não existe nenhum POST com '" + req.url +"' disponível!" })
  res.status(500)
})

router.put('/:idFilme', function(req, res){
    Filmes.update(req.params.idFilme, req.body)
        .then(dados => res.json(1))
        .catch(erro => {res.render('error', {error : erro}) ; res.status.json(erro)})
})

router.put('.*', function(req, res){
  res.render('error', {error : "Não existe nenhum PUT com '" + req.url +"' disponível!" })
  res.status(500)
})

module.exports = router;
