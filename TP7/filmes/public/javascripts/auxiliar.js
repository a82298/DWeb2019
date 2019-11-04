
function apagaFilme(id){
    axios.delete("/filmes/" + id)
        .then(function(response){ window.location.assign("/filmes/")})
        .catch(error => console.log(error))
}

function addGenreA(){
    var gen = document.getElementById('genre').value
    if(gen != ""){
        $('#generos').append("<tr><td height='15px'>" + gen + "</td>"+
                        "<td height='15px' ><button class='fa fa-minus-square' onclick='removeGenreA(this)' style='background-color: black; color: #FFBF00; padding: 15px 15px; border-radius: 12px;'></button>"+
                        "</td></tr>")
        document.getElementById('genre').value = ""
    }
}

function removeGenreA(elem){
    var index = $(elem).closest('td').parent()[0].sectionRowIndex;
    if (index > -1) {
        document.getElementById("generos").deleteRow(index)
    }
}

function addActorA(){
    var actor = document.getElementById('actor').value;
    if(actor != ""){
        $('#atores').append("<tr><td height='15px'>" + actor + "</td>"+
                        "<td height='15px' ><button class='fa fa-minus-square' onclick='removeActorA(this)' style='background-color: black; color: #FFBF00; padding: 15px 15px; border-radius: 12px;'></button>"+
                        "</td></tr>")
        document.getElementById('actor').value = ""
    }
}

function removeActorA(elem){
    var index = $(elem).closest('td').parent()[0].sectionRowIndex;
    if (index > -1) {
        document.getElementById("atores").deleteRow(index)
    }
}

function createMovie(){
    var movie = {}
    movie.title = document.getElementById("title").value
    movie.year = document.getElementById("year").value
    movie.cast = []
    movie.genres = []

    var tabCast=document.getElementById("atores")

    for(var i = 0, n = tabCast.rows.length; i < n; i++){
        movie.cast.push(tabCast.rows[i].cells[0].innerHTML)
    }

    var tabGenres=document.getElementById("generos")

    for(var i = 0, n = tabGenres.rows.length; i<n; i++){
        movie.genres.push(tabGenres.rows[i].cells[0].innerHTML)
    }

    axios.post('/filmes/new', movie)
        .then(response => window.location.assign("/filmes/"))
        .catch(error => console.log(error))
}

function updateMovie(id){
    var movie = {}
    movie.title = document.getElementById("title").value
    movie.year = document.getElementById("year").value
    movie.cast = []
    movie.genres = []

    var tabCast=document.getElementById("atores")

    for(var i = 0, n = tabCast.rows.length; i < n; i++){
        movie.cast.push(tabCast.rows[i].cells[0].innerHTML)
    }

    var tabGenres=document.getElementById("generos")

    for(var i = 0, n = tabGenres.rows.length; i<n; i++){
        movie.genres.push(tabGenres.rows[i].cells[0].innerHTML)
    }    

    axios.put('/filmes/'+id , movie)
        .then(response => window.location.assign("/filmes/"+id))
        .catch(error => console.log(error))
}