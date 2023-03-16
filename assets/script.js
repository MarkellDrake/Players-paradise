var searchbuttonEL = document.querySelector('#is-primary');
var searchBarEl = document.querySelector('#search-bar');
var yearEl = document.querySelector('#year');
var metacriticScoreEl = document.querySelector('#metacriticScore');
var gameDescriptionEl = document.querySelector('#plot')
var gameImageEl = document.querySelector('.game-art')
var consolesEl = document.querySelector('#consoles');
var trailerButtonEl = document.querySelector('#trailer-button')
var reviewButtonEl = document.querySelector('#review-button')
var gameplayButtonEl = document.querySelector('#gameplay-button')
var previousSearchesEl = document.querySelector('#previous-searches')
var videoContainerEl = document.querySelector('#videoContainer')
var gameDataEl = document.querySelector('#gameData')

//Functions to update the youtube video URL with the correct search perameters when each button is clicked
videoType = 'trailer'
videoContainerEl.style.display = 'none'
gameplayButtonEl.addEventListener('click', function() {
    videoType = 'gameplay';
    videoContainerEl.style.display = 'block';
    youtubeTest()
  });

  trailerButtonEl.addEventListener('click', function() {
    videoType = 'trailer';
    videoContainerEl.style.display = 'block';
    youtubeTest()
  });

  reviewButtonEl.addEventListener('click', function() {
    videoType = 'review';
    videoContainerEl.style.display = 'block';
    youtubeTest()
})

//Hides the video buttons until needed
var hideButtons = function () {
    trailerButtonEl.style.display = 'none'
    reviewButtonEl.style.display = 'none'
    gameplayButtonEl.style.display = 'none'
    gameDataEl.style.display = 'none'
}
//shows the video buttons when needed
var showButtons = function () {
    trailerButtonEl.style.display = 'inline'
    reviewButtonEl.style.display = 'inline'
    gameplayButtonEl.style.display = 'inline'
    gameDataEl.style.display = 'block'
}


// function used to translate user input into a readable form within the URL search
var insertCharAfterWords = function(inputString, char) {
    // Split the input string into an array of words
    var words = inputString.split(' ');
    // Join the words with the desired character in between them
    var outputString = words.join(char);
    return outputString;
  }

//RAWG API call function that retrieves all data for displaying about our game
var testFunction = function () {
    var searchValue = searchBarEl.value
    //Adds correct URL code for searching the API
    var output = insertCharAfterWords(searchValue, "%20");
    //Adds user search to URL
    var userGameUrl = 'https://api.rawg.io/api/games?search='+ output +'&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'
    //First fetch request gets the game ID, which can be used to gather even more data
    fetch(userGameUrl)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            var gameId = data.results[0].id
            console.log(gameId)
            var gameIdURL = 'https://api.rawg.io/api/games/' +  gameId + '?&key=227c60318fed4aafabdb435450204c35'
            //Second fetch request used the gameId as a search term to return all the data we want
            fetch(gameIdURL)
            .then(function(response) {
                return response.json()
            })
            .then(function(data){
                var metacriticScore = data.metacritic
                //refrence to the year that the game was released 
                var year = data.released.slice(0,4)
                var consoles = data.platforms[0].platform.name
                var gameImage = data.background_image
                var gameDescription = data.description
                console.log(metacriticScore)
                console.log(year)
                console.log(consoles)
                console.log(gameDescription)
                gameImageEl.src = gameImage
                yearEl.textContent = year;
                metacriticScoreEl.textContent = metacriticScore;
                consolesEl.textContent = consoles;
                gameDescriptionEl.innerHTML = gameDescription;
            })
            .catch(function(error) {
                console.error(error)
                // Display an error message to the user if no game is retrieved
                yearEl.textContent = 'N/A';
                metacriticScoreEl.textContent = 'N/A';
                consolesEl.textContent = 'N/A';
                gameDescriptionEl.innerHTML = 'An error occurred while fetching game data. Please try again later.'
                videoContainerEl.style.display = 'none'
            })
        })
        .catch(function(error) {
            console.error(error)
             // Display an error message to the user if no game is retrieved and hides the video container
            yearEl.textContent = 'N/A';
            metacriticScoreEl.textContent = 'N/A';
            consolesEl.textContent = 'N/A';
            gameDescriptionEl.innerHTML = 'No games were found that match your search. Please try again with a different search term.'
            videoContainerEl.style.display = 'none'
        }) 
    }

//function call to the YouTube API
var youtubeTest = function () {
    var searchValue = searchBarEl.value
    var output = insertCharAfterWords(searchValue, "%20");
    //Will need to add user input into the link
    //Link searches key words provided by the user

    var searchUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCLTB5AGoPz59wHvXdakaTp00qeCTJQugs&part=snippet&type=video&maxResults=1&q=' + output + '%20' + videoType;

//First fetch is used to grab the videoID data from the API for further use.
    fetch(searchUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var videoId = data.items[0].id.videoId;
        //Creating a new URL using the videoID data that can be used for embedding the video

        var videosUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCLTB5AGoPz59wHvXdakaTp00qeCTJQugs&part=player,snippet&id=' + videoId;

        fetch(videosUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data) {
            //Acessing the HTML embed link for the chosen video
            var videoUrl = data.items[0].player.embedHtml;
            //Uses the replace method to create a youtube video embed code to be inserted into the HTML.

            var videoEmbedCode = videoUrl.replace(/.*\/embed\/(.*)".*/, '<iframe width="500" height="290" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');

            document.querySelector('#videoContainer').innerHTML = videoEmbedCode;
        })
    })
}

//Creates a function that incorporates all of our API calls
function searchGame(event){
    //the game the user searches 
   
    showButtons();
    testFunction();
    youtubeTest()
   }


   searchbuttonEL.addEventListener("click", searchGame);

   searchbuttonEL.addEventListener("click", function() {
     var searchValue = searchBarEl.value;
   
     // Store search term in local storage
     var searches = JSON.parse(localStorage.getItem("searches")) || [];
     searches.push(searchValue);
     localStorage.setItem("searches", JSON.stringify(searches));
   
     // Display previous searches
     displayPreviousSearches();
   });
   


  //Function to display our previous to the page that are saved in local storage

  //Will limit the amount of previous searches to a set amount
  var displayPreviousSearches = function() {
    previousSearchesEl.innerHTML = '';
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    var count = 0;
    searches.forEach(function(searchValue) {
      if (count >= 15) {
        return; // exit the loop
      }

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.textContent = searchValue;
      a.href = '#'
      li.appendChild(a);
      previousSearchesEl.appendChild(li);

      count++;

    });
  };
    hideButtons()
   displayPreviousSearches();
  // Call the function after the previous searches are displayed