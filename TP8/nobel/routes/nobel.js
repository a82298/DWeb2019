var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET Lista de premios. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3006/api/premios'+req.url)
    .then(dados => {
      res.render('lista-premios', { lista: dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

/* GET listar todas as categorias */
router.get('/categorias', function(req, res){
  axios.get('http://localhost:3006/api/categorias/')
    .then(dados => {
      res.render('categorias', { lista:dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })

})

router.get('/laureados', function(req, res){
  axios.get('http://localhost:3006/api/laureados/')
  .then(dados => {
    res.render('laureados', { lista:dados.data });
  })
  .catch(erro => {
    res.render('error', {error: erro})
  })

})


/* GET Consultar um premio individual */
router.get('/:id', function(req, res) {
  axios.get('http://localhost:3006/api/premios/' + req.params.id)
    .then(dados => {
      res.render('premio-observar', { p:dados.data });
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})



module.exports = router;
