var express = require('express');
var router = express.Router();
var Ficheiros = require('../controllers/ficheiros')
var Ficheiro = require('../models/ficheiros')
var fs = require('fs');

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

/* GET users listing. */
router.get('/ficheiros', function(req, res) {
  Ficheiros.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/ficheiros', upload.array('ficheiro'), function(req,res){


  var num_files = req.files.length
  var descricao = req.body.desc

  for(var i = 0; i < num_files; i++){
    
    var new_file = req.files[i]

    let oldPath = __dirname + '/../' + new_file.path
    let newPath = __dirname + '/../public/ficheiros/' + new_file.originalname
  
    fs.rename(oldPath,newPath, function(err,data){
      if(err) throw err
    })

    let data = new Date()

    let novoFicheiro = new Ficheiro(
      {
        data: data.toISOString(),
        desc: descricao,
        name: new_file.originalname,
        mimetype: new_file.mimetype,
        size: new_file.size
    })

    novoFicheiro.save(function(err,ficheiro){
      if(err) console.log("FICHEIRO: " + new_file.originalname + " -> ERRO: "+ err)
    })

  }

  res.redirect('/')
})

module.exports = router;
