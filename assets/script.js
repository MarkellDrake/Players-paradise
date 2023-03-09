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

searchbuttonEL.addEventListener("click",searchGame);

// 'https://api.rawg.io/api/games?search='+ 'mario%20kart' + '&search_exact=true&metacritic=1,100&ordering=-released&key=227c60318fed4aafabdb435450204c35'