
function apagaMusica(index){
    axios.delete("/" + index)
        .then(function(response){ window.location.assign("/")})
        .catch(error => console.log(error))
}
