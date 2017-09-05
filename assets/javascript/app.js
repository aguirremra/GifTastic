var heros = ["aqua man", "wonder woman","batman","superman","green lantern","the joker","lex luthor","spiderman","cat woman","poison ivy","captain america","the hulk", "thor"];

renderButtons();

function renderButtons(){
    $("#heroButtons").empty();
    for (var i = 0; i < heros.length; i++) {
      $("<button>")
            .addClass("hero")
            .attr("data-name", heros[i])
            .text(heros[i])
            .appendTo($("#heroButtons"));
            // .on("click", function() {
            //   // do something
            //   //callSomeFunction();
            // });
    }
}

function displayHeros(hero){
    // queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=80cc2ded30e0457fa2a4fb3ad811786f&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var heroDiv = $("<div class='hero'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var heroImage = $("<img>");
        heroImage.attr("src", results[i].images.fixed_height.url);
        heroDiv
          .append(p)
          .append(heroImage);
        $("#hero-gifs").prepend(heroDiv);
      }
    });
}

$("button").on("click", function(){
    console.log("I'm clicked");
    var hero = $(this).attr("data-name");
    displayHeros(hero);
});

$("#add-hero").on("click", function(event){
  event.preventDefault();
  var hero = $("#hero-input").val().trim();
  heros.push(hero);
  renderButtons();
})
