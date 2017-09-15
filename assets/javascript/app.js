//object for giftastic program
var giftastic = {
  //array of heros 
  heros: ["aqua man", "wonder woman","batman","superman","green lantern","the joker","lex luthor","spiderman","cat woman","poison ivy","captain america","the hulk", "thor"],
  //function to dynamically create buttons
  renderButtons: function(){
      $("#heroButtons").empty();
      for (var i = 0; i < this.heros.length; i++) {
        $("<button>")
              .addClass("hero")
              .attr("data-name", this.heros[i])
              .text(this.heros[i])            
              .on("click", function() {
                // display heros when button is clicked
                giftastic.displayHeros($(this).data("name"));
              })
              .appendTo($("#heroButtons"));
      }
  },

  displayHeros: function(hero){
    $("#hero-gifs").empty();
      // queryURL for Giphy API
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=80cc2ded30e0457fa2a4fb3ad811786f&limit=10";

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function(response) {
        console.log(response);
        var results = response.data;
        //loop through results
        for (var i = 0; i < results.length; i++) {
          var heroDiv = $("<div class='hero-images'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var heroImage = $("<img>");
          heroImage
          .attr("src", results[i].images.fixed_height_small_still.url)
          .attr("data-alt", results[i].images.fixed_height_small.url)
          //when image is clicked swap gifs
          .on("click", function(){
             var oldSrc = $(this).attr("src");
             var oldAlt = $(this).data("alt"); //same as $(this).attr("data-alt");
             $(this).attr("src", oldAlt);
             $(this).data("alt", oldSrc);          
          });        
          heroDiv
            .append(p)
            .append(heroImage)
            .appendTo($("#hero-gifs"));
        }
      });
  }
}

giftastic.renderButtons();
//click event for adding new hero buttons
$("#add-hero").on("click", function(event){
  //prevent default submit action
  event.preventDefault();
  var hero = $("#hero-input").val().trim().toLowerCase();
  //add new item to array
  giftastic.heros.push(hero);
  //clears the input box after clicking submit
  $("form").trigger("reset");
  //render buttons after adding new item to array
  giftastic.renderButtons();
})

