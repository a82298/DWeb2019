var Filme = require('../models/filme')

const Filmes = module.exports

var ObjectId = require('mongodb').ObjectID

Filmes.listar = () => {
    return Filme
        .find()
        .sort({title: 1})
        .exec()
}

Filmes.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}

Filmes.consultar = fid => {
    return Filme
        .find(ObjectId(fid))
        .exec()
}

Filmes.projectar = campos => {
    return Filme
        .find({}, campos)
        .exec()
}

Filmes.remover = id => {
    console.log('Tentar mandar co crl '+ id)
    return Filme
            .findOneAndDelete({_id : ObjectId(id)} , {useFindAndModify : true})
            .exec()
}

Filmes.adicionar = dados => {
    var filme = new Filme(dados)
    return filme.save()
}  

Filmes.update = (idFilme, dados) => {
    return Filme.findOneAndUpdate({_id : idFilme}, dados, {useFindAndModify : true})
        .exec()
}