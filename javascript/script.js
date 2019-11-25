$( document ).ready(function() {

    var titolo;

    $(".invio").click( function(){
        titolo = $(".searchbar").val();
        
        console.log(titolo);

        $.ajax({
            url : "https://api.themoviedb.org/3/search/movie?api_key=d80459abdb15e66d6b67344e00155b7c&language=it-IT&query=" + titolo,
            method : "get",
            success : function (data) {
                var sorgente   = $("#entry-template").html();
	 		    var sorgenteDigerita = Handlebars.compile(sorgente);
                
                 var arrayFilm = data.results;

                console.log(arrayFilm);

                for(var i = 0; i<arrayFilm.length; i++) {
                    var context = {titolo: arrayFilm[i].title,
                    titolo_originale: arrayFilm[i].original_title,
                    lingua: arrayFilm[i].original_language,
                    voto: arrayFilm[i].vote_average }

                    var html = sorgenteDigerita(context);
                    $(".container").append(html);
                }

                
            },
                error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });

    })
    

    

}) 



