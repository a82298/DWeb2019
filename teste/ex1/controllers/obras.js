var Obra = require('../models/obras')

const Obras = module.exports

var ObjectId = require('mongodb').ObjectID


Obras.listar = () => {
    return Obra
        .find({}, {"_id" : true, "titulo": true , "tipo": true, "compositor":true})
        .exec()
}

// Devolve a informação de um obra
Obras.consultar = id => {
    return Obra
        .findOne({_id:id})
        .exec()
}

// Devolve os tipos das músicas
Obras.listarTipos = () =>{
    return Obra
            .distinct("tipo")
            .exec()
}

Obras.listarByInstrumento = (inst) =>{
    return Obra
            .aggregate([{$unwind:"$instrumentos.instrumento"}, 
                            {$match:{desginacao : inst}}
                ])
            .exec()
}

// Listar as obras pelo ano
Obras.listarbyCompositor = c => {
    return Obra
        .find({"compositor":c})
        .exec()
}

Obras.listarObrasPartituras = () =>{
    return Obra
    .aggregate([
        {$project: {_id:true,titulo:true,partituras: { $cond: { if: { $isArray: "$instrumentos.instrumento" }, then: { $size: "$instrumentos.instrumento" }, else: {$cond: { if: { "instrumentos": {exists:true}}, then: 1, else: 0} }}}}}] )
        .exec()
}