var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var myBD = __dirname + "/../musicas.json"


/* GET home page. */
router.get('/', function(req, res, next) {
  jsonfile.readFile(myBD, (erro, musicas) => {
    if(!erro){
      res.render('index', { lista : musicas })
    }
    else{
      res.render('erro', {error : erro})
    }
  }) 
});

//ignorar favicon
router.get('/favicon.ico', function(req,res){
  res.status(204)
})


//Pede esta música (o sistema apresenta-a numa página e poderá alterá-la)
router.get('/:index', function(req, res){
  var index = req.params.index
    jsonfile.readFile(myBD, (erro, musicas) => {
      if(!erro){
        if(index > -1 && index < musicas.length){
          console.log('Irei apresentar a página com a música que pretende alterar ' + index+ "!")
          res.render('musica', {id : index, m:musicas[index]})
        }
        else{res.render('erro', {error : "Impossível! Não existe nenhuma música com tal index ou get desse tipo! ('/" + index + "')"})}
      }
      else{
        res.render('erro', {error : "Erro a ler da Base de Dados!"})
      }
    })
})


// Retira uma música com um determinado index
router.delete('/:index', function(req, res){
  var index = req.params.index
    jsonfile.readFile(myBD, (erro, musicas) =>{
      if(!erro){
        if(index > -1 && index < musicas.length){
          musicas.splice(index, 1)
          jsonfile.writeFile(myBD, musicas, erro => {
            if(erro) {
              console.log(erro)
              res.render('erro', {error : "Erro na escrita da Base de Dados"})
            }
            else {
              console.log('BD atualizada com sucesso.')
              //res.render('index', {lista : musicas})
              return res.json(0);
            }
          })
        }
        else{
          console.log("Erro, pois o index que quer eliminar, não é válido")
          res.render('erro', {error : "Erro, pois o index que quer eliminar, não é válido"})
        }
      
      }
      else{
        res.render('erro', {error : "Erro na leitura da Base de Dados!"})
      }
    })
})

// Update musica
router.post('/:index?', function(req, res){
  var index = req.params.index
  console.log('A alterar música ' + index + ' da BD')
  jsonfile.readFile(myBD, (erro, musicas) => {
    if(!erro){
      var prov, local, titulo, musico, duracao, inst
      if(( prov = req.body.prov) != ''){
        musicas[index].prov = prov
      }
      if( (local = req.body.local) != ''){
        musicas[index].local = local;
      }
      if( (titulo = req.body.tit) != ''){
        musicas[index].tit = titulo
      }
      if( (musico = req.body.musico) != ''){
        musicas[index].musico = musico
      }
      if( (duracao = req.body.duracao) != ''){
        musicas[index].duracao = duracao
      }
      if( (inst = req.body.inst) != ''){
        musicas[index].inst = inst
      }
      jsonfile.writeFile(myBD, musicas, erro =>{
        if(!erro){
          console.log("BD atualizada com sucesso")
          res.redirect("/"+index)
        }
        else{
          res.render('erro', {error:"Erro na escrita da BD"})
        }
      })
    }
    else{
      res.render('erro', {error: "Erro ao ler da base de dados.."})
    }
  })

})

// Adiciona uma nova música
router.post('/musica', function(req, res, next){
  jsonfile.readFile(myBD, (erro, musicas) => {
      if(!erro){
        musicas.push(req.body)
        jsonfile.writeFile(myBD, musicas, erro =>{
          if(!erro){
            console.log("BD atualizada com sucesso")
            res.redirect("/")
          }
          else{
            res.render('erro', {error:"Erro na escrita da BD"})
          }
        })
      }
      else{
        res.render('erro', {error:"Erro na leitura da BD"})
      }
  })
})

module.exports = router;
