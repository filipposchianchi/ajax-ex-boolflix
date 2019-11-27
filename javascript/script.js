$( document ).ready(function() {

    var titolo;

    $(".invio").click( function(){
        titolo = $(".searchbar").val();

        var sorgente   = $("#entry-template").html();
	 	var sorgenteDigerita = Handlebars.compile(sorgente);
        
        /*FILM */
        $.ajax({
            url : "https://api.themoviedb.org/3/search/movie?api_key=d80459abdb15e66d6b67344e00155b7c&language=it-IT&query=" + titolo,
            method : "get",
            success : function (data) {
                $(".titolo").empty();
                $(".searchbar").val("");
                console.log(data.results)
                
                var arrayFilm = data.results;

                if(arrayFilm.length>0){
                    $(".film").show();
                    $("#left-button-film").show();
                    $("#right-button-film").show();
                }

                for(var i = 0; i<arrayFilm.length; i++) {

                    var voto = Math.ceil(arrayFilm[i].vote_average / 2)

                    var context = {
                        src : poster(arrayFilm[i].poster_path),
                        titolo: arrayFilm[i].title,
                        titolo_originale: arrayFilm[i].original_title,
                        lingua: bandiera(arrayFilm[i].original_language),
                        stelle: stelle(voto),
                        trama: trama(arrayFilm[i].overview)
                    }
                    var html = sorgenteDigerita(context);
                    $(".wrapper-film").append(html);
                }
            },
                error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });

        /*SERIE TV */
        $.ajax({
            url : "https://api.themoviedb.org/3/search/tv?api_key=d80459abdb15e66d6b67344e00155b7c&language=it-IT&query=" + titolo,
            method : "get",
            success : function (data) {

                var arrayTv = data.results;

                if(arrayTv.length>0){
                    $(".serie").show();
                    $("#left-button-serie").show();
                    $("#right-button-serie").show();

                }

                console.log(data.results);

                for(var i = 0; i<arrayTv.length; i++) {

                    var voto = Math.ceil(arrayTv[i].vote_average / 2)

                    var context = {
                        src : poster(arrayTv[i].poster_path),
                        titolo: arrayTv[i].name,
                        titolo_originale: arrayTv[i].original_name,
                        lingua: bandiera(arrayTv[i].original_language),
                        stelle: stelle(voto),
                        trama: trama(arrayTv[i].overview)
                    }

                    var html = sorgenteDigerita(context);
                    $(".wrapper-serie").append(html);
                }
   
            },
                error : function (errore) {
                alert("E' avvenuto un errore. "+errore);
            }
        });

    })


    $('#right-button-film').click(function() {
        $('.wrapper-film').animate({
          scrollLeft: "+=200px"
        }, "slow");
    });
      
    $('#left-button-film').click(function() {
        $('.wrapper-film').animate({
          scrollLeft: "-=200px"
        }, "slow");
    });

    $('#right-button-serie').click(function() {
        $('.wrapper-serie').animate({
          scrollLeft: "+=200px"
        }, "slow");
    });
      
    $('#left-button-serie').click(function() {
        $('.wrapper-serie').animate({
          scrollLeft: "-=200px"
        }, "slow");
    });


    function bandiera(lingua) {
        var stringa
        if(lingua==="it") {
            stringa = '<img class="nazione" src="assets/img/italy.png"></img>'
        } else if (lingua === "de") {
            stringa = '<img class="nazione" src="assets/img/germany.png"></img>'
        } else if (lingua === "en") {
            stringa = '<img class="nazione" src="assets/img/united_kingdom.png"></img>'
        } else if(lingua ==="es") {
            stringa = '<img class="nazione" src="assets/img/spain.png"></img>'
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

    function trama(overview){
        var stringaTrama;
        if(overview === "") {
            stringaTrama = "";
        } else {
            stringaTrama = "<b>Trama: </b> " + overview;
        }
        return stringaTrama
    }


    function poster(stringaFinale){
        var stringaPoster;
        if(stringaFinale === null) {
            stringaPoster = "assets/img/white.jpg";
        }
        else {
            stringaPoster = "https://image.tmdb.org/t/p/w342" + stringaFinale;
        }
        return stringaPoster
    }
}) 



