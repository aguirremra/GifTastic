var heros = ["aqua man", "wonder woman","batman","superman","green lantern","the joker","lex luthor","spiderman","cat woman","poison ivy","captain america","the hulk", "thor"];

renderButtons();

function renderButtons(){
    $("#heroButtons").empty();
    for (var i = 0; i < heros.length; i++) {
      $("<button>")
            .addClass("hero")
            .attr("data-name", heros[i])
            .text(heros[i])            
            .on("click", function() {
              // do something
              displayHeros($(this).data("name"));
            })
            .appendTo($("#heroButtons"));
    }
}

function displayHeros(hero){
  $("#hero-gifs").empty();
    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=80cc2ded30e0457fa2a4fb3ad811786f&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var heroDiv = $("<div class='hero-images'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var heroImage = $("<img>");
        heroImage
        .attr("src", results[i].images.fixed_width_still.url)
        .attr("data-alt", results[i].images.fixed_width.url)
        .on("click", function(){
           //getImage($(this).attr("src"));
           var oldSrc = $(this).attr("src");
           var oldAlt = $(this).data("alt"); //same as $(this).attr("data-alt");
           $(this).attr("src", oldAlt);
           $(this).data("alt", oldSrc);          
        });        
        heroDiv
          .append(p)
          .append(heroImage)
        // $("#hero-gifs").prepend(heroDiv);
          .appendTo($("#hero-gifs"));
        // $("#hero-gifs")
        // .append(p)
        // .append(heroImage);
      }
    });
}

$("#add-hero").on("click", function(event){
  event.preventDefault();
  var hero = $("#hero-input").val().trim();
  heros.push(hero);
  renderButtons();
})

