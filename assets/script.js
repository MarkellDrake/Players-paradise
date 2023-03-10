var RAWGAPIKey = '227c60318fed4aafabdb435450204c35'
var searchbuttonEL = document.querySelector('#is-primary');
var searchBarEl = document.querySelector('#search-bar');
var yearEl = document.querySelector('#year');
var metacriticScoreEl = document.querySelector('#metacriticScore');
var esrbRatingEl = document.querySelector('#esrbRating');
var gameImageEl = document.querySelector('.game-art')
var consolesEl = document.querySelector('#consoles');
var trailerButtonEl = document.querySelector('#trailer-button')
var reviewButtonEl = document.querySelector('#review-button')
var gameplayButtonEl = document.querySelector('#gameplay-button')
var previousSearchesEl = document.querySelector('#previous-searches')

var hideButtons = function () {
    trailerButtonEl.style.display = 'none'
    reviewButtonEl.style.display = 'none'
    gameplayButtonEl.style.display = 'none'
}

var showButtons = function () {
    trailerButtonEl.style.display = 'inline'
    reviewButtonEl.style.display = 'inline'
    gameplayButtonEl.style.display = 'inline'
}

hideButtons()


var insertCharAfterWords = function(inputString, char) {
    // Split the input string into an array of words
    var words = inputString.split(' ');
    // Join the words with the desired character in between them
    var outputString = words.join(char);
    return outputString;
  }


 


var testFunction = function () {
    var searchValue = searchBarEl.value
    var output = insertCharAfterWords(searchValue, "%20");
    var userGameUrl = 'https://api.rawg.io/api/games?search='+ output +'&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'
    fetch(userGameUrl)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            var gameId = data.results[0].id
            console.log(gameId)
            var gameIdURL = 'https://api.rawg.io/api/games/' +  gameId + '?&key=227c60318fed4aafabdb435450204c35'
            fetch(gameIdURL)
            .then(function(response) {
                return response.json()
            })
            .then(function(data){
                var metacriticScore = data.metacritic
                //refrence to the year that the game was released 
                var year = data.released.slice(0,4)
                //var ESRBRating = data.esrb_rating.name
                var consoles = data.platforms[0].platform.name
                var gameImage = data.background_image
                console.log(metacriticScore)
                console.log(year)
                //console.log(ESRBRating)
                console.log(consoles)
                gameImageEl.src = gameImage
                yearEl.textContent = year;
                metacriticScoreEl.textContent = metacriticScore;
                //esrbRatingEl.textContent = ESRBRating;
                consolesEl.textContent = consoles;
            })
        }) 
    }
    
    

//'https://api.rawg.io/api/games?search='+ 'mario%20kart' + '&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'

//function to the YouTube API
var youtubeTest = function () {
    var searchValue = searchBarEl.value
    var output = insertCharAfterWords(searchValue, "%20");
    //Will need to add user input into the link
    //Link searches key words provided by the user
    var searchUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBZdZHH3hqAOG4qxy3IiD3zQgHcun_aIG4&part=snippet&type=video&maxResults=1&q=' + output + '%20' + videoType;
//First fetch is used to grab the videoID data from the API for further use.
    fetch(searchUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var videoId = data.items[0].id.videoId;
        //Creating a new URL using the videoID data that can be used for embedding the video
        var videosUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBZdZHH3hqAOG4qxy3IiD3zQgHcun_aIG4&part=player,snippet&id=' + videoId;
        fetch(videosUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data) {
            //Acessing the HTML embed link for the chosen video
            var videoUrl = data.items[0].player.embedHtml;
            //Uses the replace method to create a youtube video embed code to be inserted into the HTML.
            var videoEmbedCode = videoUrl.replace(/.*\/embed\/(.*)".*/, '<iframe width="560" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
            document.querySelector('#videoContainer').innerHTML = videoEmbedCode;
        })
    })
}
function searchGame(event){
    //the game the user searches 
    showButtons();
    testFunction();
    youtubeTest();
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
   
   var displayPreviousSearches = function() {
     previousSearchesEl.innerHTML = '';
     var searches = JSON.parse(localStorage.getItem('searches')) || [];
     searches.forEach(function(searchValue) {
       var li = document.createElement('li');
       li.textContent = searchValue;
       previousSearchesEl.appendChild(li);
     });
   };

   displayPreviousSearches();

// 'https://api.rawg.io/api/games?search='+ 'mario%20kart' + '&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'

