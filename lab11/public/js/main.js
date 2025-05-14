/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.

1. Page load: When the page loads, you will query the Marvel to get the list of 100 characters (Look up using the limit url parameter, by default, the character list returns 20 characters, you would include a limit URL parameter to return 100 characters from the end point and not the default of 20) using an AJAX request.  Once the AJAX request returns the data, you will then create list items of links for each character that is returned using jQuery or the DOM API. The link text will be the name of the Character, and the href attribute will be set to the url for that Character from the Marvel API.  For example, Spider-man's ID is 1011054, So the URL, the value would be: https://gateway.marvel.com:443/v1/public/characters/1011054 Links to an external site.  For the link, you will need to call a function on the click event of the link (do not forget to preventDefault() for the default behavior for the link as the default behavior of a link is that it wants to load something (similar to how the default behavior of a form submission is to send that form data somewhere)

You will then append each list item to the characterList UL element and then show the characterList element (make sure you hide the characterDetails element).  

Endpoint to be used: https://gateway.marvel.com/v1/public/characters Links to an external site. (Remember, you need to use the limit URL parameter to return 100 characters from the API by default)

2. Search Form Submission: If there is no value for the search_term input when the form is submitted, you should not continue and instead should inform them of an error somehow. (don't forget to take into account if they just submit the form with a bunch of spaces as the value!)  If there is a value, you will first empty the list item elements in the characterList element (because there will be elements from the initial characterList still there, they are just hidden),  then query the API for that search_term using an AJAX request. Once the AJAX request returns the data, you will then create list items of links for each Character that is returned for the search term using jQuery or the DOM API.  The link text will be the name of the Character, and the href attribute will be set to the url for that Character from the Marvel API.  For example, Spider-man's ID is 1011054, So the URL, the value would be: https://gateway.marvel.com:443/v1/public/characters/1011054 Links to an external site.  For the link, you will need to call a function on the click event of the link (do not forget to preventDefault() for the default behavior for the link as the default behavior of a link is that it wants to load something (similar to how the default behavior of a form submission is to send that form data somewhere)

You will then append each list item to the characterList UL element and then show the characterList element (make sure you hide the characterDetails element).  

Endpoint to be used: https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=SEARCH_TERM_HERE Links to an external site. 

3.  Link Clicked: For the link, you will need to call a function on the click event of the link and not the default link behavior (do not forget to use preventDefault()).    When the link to a character is clicked, it will hide the characterList element, it will then empty the characterDetails  element (just in case there was Character data previously loaded into the characterDetails element). It will then make an AJAX request to the URL and fetch the data for that Character (that was the href in your link).  You will parse through the Character data returned from the AJAX request. You will create the following elements using jQuery or the DOM API:  An h1 with the character name,  an img which the src is set to the value read from thumbnail.path in the data which is a URL to an image for the character.  NOTE: The path in the data is NOT the full image path. You will need to concatenate "/portrait_uncanny.jpg" to the end of the image path in the data (see HTML example below). Please see the documentation on images.  You will have a p element that contains the character  description, a h2 that's content says "Comics"  and a ul  for the list of comics. You only need to display the comic name  as the list items: li  You will then show the characterDetails  element.  

NOTE: Not all Characters have ALL data displayed on the characterDetails  element, which will cause your application to not work correctly when a character link is clicked if it doesn't have all the needed data needed for the characterDetails element.  You will be required to check each field needed for the characaterDetails element.  If there is no value for a field, you will show "N/A" instead of that field's value on the characterDetails element.  

Endpoint to be used: https://gateway.marvel.com:443/v1/public/characters/:id Links to an external site.  (this is read from the href attribute of the link)


*/
$(document).ready(function () {
  const publicKey = "4a5762881a8e1c4fe197b24ffa675a52";
  const privateKey = "3f7000db0aa662929c4b601dc1cab2e095289eb8";

  function generateAuthParams() {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }

  function displayCharacters(characters) {
    $("#characterList").empty();
    characters.forEach((char) => {
      const link = $("<a>")
        .attr("href", "#")
        .attr("data-id", char.id)
        .text(char.name);
      $("#characterList").append($("<li>").append(link));
    });
    $("#characterList").show();
    $("#characterDetails").hide();
    $("#homeLink").show();
  }

  function showCharacterDetails(character) {
    const article = $("<article>");
    article.append(`<h1>${character.name}</h1>`);

    if (character.thumbnail?.path && character.thumbnail?.extension) {
      article.append(
        `<img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="${character.name} image">`
      );
    }

    article.append(`<p>${character.description || "N/A"}</p>`);

    const infoSection = $("<section>").append("<h3>Details</h3>");
    const dl = $("<dl>")
      .append("<dt>ID:</dt>", `<dd>${character.id}</dd>`)
      .append(
        "<dt>Available Comics:</dt>",
        `<dd>${character.comics.available}</dd>`
      );
    infoSection.append(dl);
    article.append(infoSection);

    article.append("<h2>Comics</h2>");
    if (character.comics.items?.length) {
      const comicsList = $("<ul>");
      character.comics.items.forEach((comic) => {
        comicsList.append(`<li>${comic.name}</li>`);
      });
      article.append(comicsList);
    } else {
      article.append("<p>N/A</p>");
    }

    $("#characterDetails").html(article).show();
    $("#characterList").hide();
    $("#homeLink").show();
  }

  // to show 100 characters
  (function fetchInitialCharacters() {
    const authParams = generateAuthParams();
    const url = `https://gateway.marvel.com/v1/public/characters?limit=100&${authParams}`;

    $.ajax({
      method: "GET",
      url: url,
      dataType: "json",
    })
      .done((response) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          displayCharacters(results);
        } else {
          $("#errorMessage").text("No characters to display").show();
        }
      })
      .fail(() => {
        $("#errorMessage").text("Failed to load characters").show();
      });
  })();

  $("#searchForm").submit(function (event) {
    event.preventDefault();
    const searchTerm = $("#search_term").val().trim();

    if (!searchTerm) {
      $("#errorMessage").text("Please enter a search term").show();
      return;
    }

    $("#errorMessage").hide();
    $("#characterDetails").hide();
    $("#characterList").empty().hide();
    $("#homeLink").hide();

    const authParams = generateAuthParams();
    const searchUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${encodeURIComponent(
      searchTerm
    )}&${authParams}`;

    $.ajax({
      method: "GET",
      url: searchUrl,
      dataType: "json",
    })
      .done((response) => {
        const results = response.data.results;
        if (!results || results.length === 0) {
          $("#errorMessage").text("No characters found").show();
          return;
        }
        displayCharacters(results);
      })
      .fail(() => {
        $("#errorMessage").text("Failed to fetch Marvel characters").show();
      });
  });

  $("#characterList").on("click", "a", function (event) {
    event.preventDefault();
    const charId = $(this).data("id");
    const authParams = generateAuthParams();
    const detailsUrl = `https://gateway.marvel.com/v1/public/characters/${charId}?${authParams}`;

    $("#characterDetails").empty().hide();

    $.ajax({
      method: "GET",
      url: detailsUrl,
      dataType: "json",
    })
      .done((response) => {
        const character = response.data.results[0];
        if (!character) {
          $("#errorMessage").text("Character not found").show();
          return;
        }
        showCharacterDetails(character);
      })
      .fail(() => {
        $("#errorMessage").text("Failed to load character details").show();
      });
  });
});
