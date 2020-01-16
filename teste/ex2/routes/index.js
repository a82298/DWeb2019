var express = require('express');
var router = express.Router();

var axios = require('axios')

var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades' + '?apikey='  + key)
      .then(dados =>{ res.render('index', {lista:dados.data})})
      .catch(erro => res.status(500).render('erro', {error:erro}))
});

router.get('/tipologias/:id', function(req, res){
  var id = req.params.id
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + id + "?apikey=" + key)
       .then(dados =>{
          res.render('tipologia', {dados: dados.data})
       })
       .catch(erro => res.status(500).render('error', {error: erro}))
})

router.get('/classes/:id', function(req, res){
  var id = req.params.id
  console.log(id)
  axios.get('http://clav-api.dglab.gov.pt/api/classes/c' + id + '?apikey=' + key)
      .then(dados =>{
          console.log(id)
          res.render('processo', {dados : dados.data})
      })
      .catch(erro => res.status.render('error', {error: erro}))
  
})

router.get('/:id', function(req, res){
  var id = req.params.id
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id + "?apikey=" + key)
       .then(entidade => {
         axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+ id +'/tipologias' + '?apikey=' + key)
              .then(tipologias => {
                  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id +'/intervencao/dono' + '?apikey=' + key)
                      .then(listadono => {
                        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id +'/intervencao/participante' + '?apikey=' + key)
                            .then(listaparticipante => {
                                
                                res.render('entidade', {dados : entidade.data, tipologias : tipologias.data, donos : listadono.data, participantes : listaparticipante.data})
                            })
                            .catch(erro => res.status(500).render('error', {error : erro}))
                      })
                      .catch(erro => res.status(500).render('error', {error : erro}))
              })
              .catch(erro => res.status(500).render('error', {error : erro}))
       })
       .catch(erro => res.status(500).render('error', {error : erro}))

})




module.exports = router;
