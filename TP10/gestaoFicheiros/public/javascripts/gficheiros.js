function showFicheiro(f){
    if(f.mimetype == 'image/png')
        var ficheiro = $('<img src="/ficheiros/'+ f.name+ '" width="80%"/>')
    else
        var ficheiro = $(apresentaFicheiro(f))

    var button = '<button type="submit" class="fa fa-cloud-download w3-hover-teal" style="background-color: DodgerBlue; color: white; width:100%; padding:15px; font-size:20px; border-radius: 12px;">   Download</button>'
    var download = '<form action = "/download/' + f.name +'">'+ button + '</form>';
    $('#display').empty()
    $('#display').append(ficheiro,download)
    $('#display').modal()
}

function apresentaFicheiro(f){
    var title = '<div class="w3-container w3-teal"><center><h4> Informações sobre o ficheiro </h4></center></div>'

    var conteudotable = '<tr><th>Data</th><td>'+ f.data + '</td></tr>' + '<tr><th>Descrição</th><td>'+ f.desc + '</td></tr>' 
                        + '<tr><th>Nome</th><td>'+ f.name + '</td></tr>'+ '<tr><th>Tipo</th><td>'+ f.mimetype + '</td></tr>'
                        + '<tr><th>Tamanho</th><td>'+ f.size + '</td></tr>';
    
    return (title + '<table class="w3-table">' + conteudotable + '</table>');

}