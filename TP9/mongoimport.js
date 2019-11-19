// node mongoimport.js --db dbName --collection collectionName --file fileName.json --jsonArray

var args = process.argv.slice(2)

if(args[0] == '--db' && args[2] == "--collection" && args[4] == '--file'){
    var dbName = args[1]

    var collectionName = args[3]

    var file = args[5]

    var jsonfile = require('jsonfile')

    var mongoose = require('mongoose')
    
    var GenerateSchema = require('generate-schema')

    if(file != null && file.match('.*[.]json')){
        const fs = require('fs')
        fs.exists(file, (exists)=>{
            if(exists){
                if(collectionName[collectionName.length-1] != 's'){
                    collectionName += 's'
                }
                console.log('DataBase Name: ' + dbName + '\nCollection Name: ' + collectionName + '\njsonFile: ' + file)

                
                mongoose.connect('mongodb://127.0.0.1:27017/'+dbName, {useNewUrlParser: true})
                    .then(()=> {console.log('A criar a DataBase...'); createModel(collectionName, file);})
                    .catch((erro)=> console.log('Mongo - erro na conexão: ' + erro ))
                
                
                /*
                mongoose.model()

                
                */

            }
            else console.log('O ficheiro indicado não existe!\n')
        }) 
    }
    else console.log('Não forneceu um ficheiro do tipo JSON!\n')
    
}
else console.log('Não passou os argumentos corretos!\n')


function createModel(collectionName, file){
    console.log('A criar Collection...')
    jsonfile.readFile(file, (erro, conteudo)=>{
        if(!erro){
            var schema = GenerateSchema.json(collectionName, conteudo);
            //console.log(JSON.stringify(schema))
            module.exports = mongoose.model(collectionName, new mongoose.Schema (schema.items.properties))

            module.exports.insertMany(conteudo)
                        .then(() => {console.log('Foram criados ' + conteudo.length + ' documentos!'); console.log('DataBase criada!'); mongoose.disconnect()})
                        .catch((error) => {console.log(error)})

            /*
            for(var index in conteudo){
                //cada atributo de cada objeto
                for(key in conteudo[index]){
                    console.log(key)
                }
            }
            */
        }
        else console.log(erro)
    })
} 
