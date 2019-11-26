$( document ).ready(function() {

    var titolo;

    $(".invio").click( function(){
        titolo = $(".searchbar").val();

        var sorgente   = $("#entry-template").html();
	 	var sorgenteDigerita = Handlebars.compile(sorgente);
        

        $.ajax({
            url : "https://api.themoviedb.org/3/search/movie?api_key=d80459abdb15e66d6b67344e00155b7c&language=it-IT&query=" + titolo,
            method : "get",
            success : function (data) {
                $(".titolo").empty();
                $(".searchbar").val("");
                
                var arrayFilm = data.results;

                for(var i = 0; i<arrayFilm.length; i++) {

                    var voto = Math.ceil(arrayFilm[i].vote_average / 2)

                    var context = {
                        titolo: arrayFilm[i].title,
                        titolo_originale: arrayFilm[i].original_title,
                        lingua: bandiera(arrayFilm[i].original_language),
                        stelle: stelle(voto)
                    }
                    var html = sorgenteDigerita(context);
                    $(".container").append(html);
                }
            },
                error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });


        $.ajax({
            url : "https://api.themoviedb.org/3/search/tv?api_key=d80459abdb15e66d6b67344e00155b7c&language=it-IT&query=" + titolo,
            method : "get",
            success : function (data) {
                $(".titolo").empty();

                var arrayTv = data.results;

                for(var i = 0; i<arrayTv.length; i++) {

                    var voto = Math.ceil(arrayTv[i].vote_average / 2)

                    var context = {
                        titolo: arrayTv[i].name,
                        titolo_originale: arrayTv[i].original_name,
                        lingua: bandiera(arrayTv[i].original_language),
                        stelle: stelle(voto)
                    }
                    var html = sorgenteDigerita(context);
                    $(".container").append(html);

                }
   
            },
                error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });

    })

    function bandiera(lingua) {
        var stringa
        if(lingua==="it") {
            stringa = '<img src="assets/img/italy.png"></img>'
        } else if (lingua === "de") {
            stringa = '<img src="assets/img/germany.png"></img>'
        } else if (lingua === "en") {
            stringa = '<img src="assets/img/united_kingdom.png"></img>'
        } else if(lingua ==="es") {
            stringa = '<img src="assets/img/spain.png"></img>'
            return stringa
        } else {
            stringa = lingua;
        }
        return stringa
    }

    function stelle(voto){
        var stringa;
        if(voto === 1) {
            stringa = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
        } else if (voto === 2){
            stringa = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
        } else if (voto === 3){
            stringa = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
        } else if (voto === 4){
            stringa = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
        } else if (voto === 5){
            stringa = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
        } else {
            stringa = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
        }
        
        return stringa;
    }
    

    

}) 



