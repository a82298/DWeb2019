var Prize = require('../models/nobel')

const Nobel = module.exports

var ObjectId = require('mongodb').ObjectID

Nobel.listar = () =>{
    return Prize
            .aggregate([{$unwind: "$year"}, {$sort: {year : 1}}])
            .exec()
}

Nobel.consultar = id =>{
    return Prize
            .findOne(ObjectId(id))
            .exec()
}

Nobel.categorias = () =>{
    return Prize
            .aggregate([{$unwind: "$category"},{$group: {_id: "$category"}}])
            .exec()
}

Nobel.premioCategoria = cat =>{
    return Prize
            .find({category : cat})
            .exec()
}

Nobel.premioCatYear = (cat, ano) =>{
    console.log("Valor do ano no controller: "+ ano)
    return Prize
            .aggregate([{$match: {category : cat, year : {$gt : ano}}}, { $sort : {"year" : 1} }])
            .exec()
}


Nobel.laureados = () =>{
    return Prize
            .aggregate([{$unwind:"$laureates"}, 
                        {$sort: {"laureates.firstname":1, "laureates.surname":1}}, 
                        {$project : {_id: false, "laureates.id": true, "laureates.firstname":true, "laureates.surname": true, year:true, category:true}}])
            .exec()
}

