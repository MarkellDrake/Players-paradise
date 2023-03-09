var RAWGAPIKey = '227c60318fed4aafabdb435450204c35'

var userGameUrl = 'https://api.rawg.io/api/games?search='+ searchValue +'&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'
var searchbuttonEL = document.querySelector('#is-primary');
var searchBarEl = document.querySelector('#search-bar');

var yearEl = document.querySelector('#year');
var metacriticScoreEl = document.querySelector('#metacriticScore');
var esrbRatingEl = document.querySelector('#esrbRating');
var consolesEl = document.querySelector('#consoles');
var searchValue = searchBarEl.value


function searchGame(event){
 //the game the user searches 

testFunction();


}


searchbuttonEL.addEventListener('click',searchGame);


// KEEP THIS LINK FOR GATHERING DESCRIPTION
//https://api.rawg.io/api/games/23165?&key=227c60318fed4aafabdb435450204c35
//This will be used as a second fetch request to gather the data by game Id
//The first fetch request will be used only to grab the game ID
//The game ID will be added to the second URL
//The second fetch request will be used to gather all other data for the game


var testFunction = function () {
fetch(testURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var metacriticScore = data.results[0].metacritic
        // refrence to the year that the game was released 
        var year = data.results[0].released.slice(0,4)
        var ESRBRating = data.results[0].esrb_rating.name
        var consoles = data.results[0].platforms[0].platform.name
        var gameId = data.results[0].id
        console.log(gameId)
        console.log(metacriticScore)
        console.log(year)
        console.log(ESRBRating)
        console.log(consoles)

        yearEl.textContent = year;
        metacriticScoreEl.textContent = metacriticScore;
        esrbRatingEl.textContent = ESRBRating;
        consolesEl.textContent = consoles;



    }) 
}


'https://api.rawg.io/api/games?search='+ 'mario%20kart' + '&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'

//function to the YouTube API
var youtubeTest = function () {
    //Will need to add user input into the link
    //Link searches key words provided by the user
    var searchUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBZdZHH3hqAOG4qxy3IiD3zQgHcun_aIG4&part=snippet&type=video&maxResults=1&q=mario%20kart%20review';
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

searchbuttonEL.addEventListener("click",searchGame);

// 'https://api.rawg.io/api/games?search='+ 'mario%20kart' + '&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'

