var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var porta = 5005

var {parse} = require('querystring')

var myBD = "tarefas.json"

var myServer = http.createServer((req,res)=>{
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if((purl.pathname == '/')||(purl.pathname == '/index')||(purl.pathname == '/gestaoTarefas')){
            // quando pede a página principal
            apresentaIndex(res)
        }
        else if(purl.pathname == '/w3.css'){
            // quando pede o ficheiro css
            res.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                if(!erro){
                    res.write(dados)
                }
                else
                    res.write("<p>Erro: " + erro + "</p>")
                res.end()
            })
        }
        else if(purl.pathname == '/favicon.ico'){
            // ignorar favicon, uma vez que se trata de uma imagem não requerida pelo professor
        }
        else{
            // Pedido GET não suportado
            apresentaErro(res,req.method + ' com \'' + purl.pathname + "\'")
        }

    }
    else if(req.method == 'POST'){
        // Para inserir uma nova tarefa
        if(purl.pathname == '/tarefa'){
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas)=>{
                    if(!erro){
                        tarefas.push(resultado)
                        jsonfile.writeFile(myBD, tarefas, erro => {
                            if(erro)
                                console.log(erro)
                            else
                                console.log('Tarefa gravada com sucesso...')
                            apresentaIndex(res)     
                        })
                    }
                })
            })            
        }
        else{
            // Pedido PUT não suportado
            apresentaErro(res,req.method + ' com \'' + purl.pathname + "\'")
        }
    }
    else{
        // Outro qualquer pedido que não seja suportado
        apresentaErro(res, req.method)
    }
})

// servidor à escuta na porta definida
myServer.listen(porta, ()=>{
    console.log("Servidor à escuta na porta " + porta + "...")
})

// Função que apresenta o index
function apresentaIndex(res){
    jsonfile.readFile(myBD, (erro,tarefas)=>{
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        if(erro){
            // caso não consiga carregar a base de dados
            console.log("Ficheiro jason não existe! A ser criado..")
            jsonFile.writeFile(myBD, [])
        }

        res.write(pug.renderFile('index.pug',{lista: tarefas}))

        res.end()
    })
}

// Função responsável por apresentar um erro, seja por um pedido não suportado ou outra coisa, cuja a variável 'erro' carrega a mensagem a ser transmitida
function apresentaErro(res, erro){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    console.log("ERRO: " + erro + " não suportado...")
    res.write(pug.renderFile('erro.pug', 
        {e: erro + " não suportado..."}))
    res.end()
}

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}