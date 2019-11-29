$(document).ready(function() {	

    $(".invio").click(search);

    $('#right-button-film').click(function() {
        $('.wrapper-film').animate({
          scrollLeft: "+=700px"
        }, "slow");
    });
      
    $('#left-button-film').click(function() {
        $('.wrapper-film').animate({
          scrollLeft: "-=700px"
        }, "slow");
    });
    
    $('#right-button-serie').click(function() {
        $('.wrapper-serie').animate({
          scrollLeft: "+=700px"
        }, "slow");
    });
      
    $('#left-button-serie').click(function() {
        $('.wrapper-serie').animate({
          scrollLeft: "-=700px"
        }, "slow");
    });
});

function reset() {	

     $(".wrapper-film").empty();
     $(".wrapper-serie").empty();

}

function search() {	

    reset();	

    var urlMovie = 'https://api.themoviedb.org/3/search/movie';
    var urlTv = 'https://api.themoviedb.org/3/search/tv';

    var q = $(".searchbar").val();	
    console.log(q);

    getData(urlMovie, q, 'movie');
	getData(urlTv, q, 'tv');
}

function getData(url, query, type) {	

    var apiKey = 'd80459abdb15e66d6b67344e00155b7c';	
    $.ajax({		
        url: url,
		method: "GET",
		data: {
			api_key: apiKey,
			query: query,
			language: "it-IT"
		},
        success: function(data) {

            var elements = data.results;

            if(type === "movie" && elements.length > 0) {
                $(".film").show();
                $("#left-button-film").show();
                $("#right-button-film").show();
                $(".benvenuto-wrapper").hide()
            } else if(type === "tv" && elements.length > 0){
                $(".serie").show();
                $("#left-button-serie").show();
                $("#right-button-serie").show();
                $(".benvenuto-wrapper").hide()

            }

			print(type, elements);
		},
		error: function(err) {			
            console.log(err);
		}
	});
}

function print(type, elems) {

    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i=0;i<elems.length;i++) {	

        var elem = elems[i];

        var title = (type == "movie" ? elem.title : elem.name);
        var originalTitle = (type == "movie" ? elem.original_title : elem.original_name);		
        

        var voto = Math.ceil(elem.vote_average / 2)

        var context = {			
            titolo: title,
			titolo_originale: originalTitle,
			lingua: bandiera(elem.original_language),
			stelle: stelle(voto),
            src: poster(elem.poster_path),
            trama: trama(elem.overview)
        };		
        
        var html = template(context);

        if(type === "movie") {
            $(".wrapper-film").append(html);
        } else {
            $(".wrapper-serie").append(html);
        }
		
    }

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

    function trama(overview){
        var stringaTrama;
        if(overview === "") {
            stringaTrama = "";
        } else {
            stringaTrama = "<b>Trama: </b> " + overview;
        }
        return stringaTrama
    }
}

