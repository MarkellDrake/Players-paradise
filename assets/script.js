var RAWGAPIKey = '227c60318fed4aafabdb435450204c35'
var URL = 'https://api.rawg.io/api/games?search='
var searchbuttonEL = document.querySelector('.button is-primary');
var searchBarEl = document.querySelector('.input search-bar');



function searchBar(event){
event.preventDefault()

var searchValue = document.searchBarEl.value


document.searchBarEl.value = ""
}

searchbuttonEL.addEventListener('click',searchBar);





var testFunction = function () {
var testURL = '
fetch(testURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var metacriticScore = data.results.metacritic
        // refrence to the year that the game was released 
        var year = data.results.released
        var ESRBRating = data.results.esrb_rating
        console.log(metacriticScore)
        console.log(year)
        console.log(ESRBRating)
    })
}
https://api.rawg.io/api/games/{god-of-war}?search=God%20of%20War&&fields=name,genre,rating,description&search_precise=true&key=227c60318fed4aafabdb435450204c35'