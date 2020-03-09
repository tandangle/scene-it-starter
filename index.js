function saveToWatchlist(imdbID){ 
    var searchString = document.getElementById("search-form-bar").value;
    console.log(searchString)
    var urlEncodedSearchString = encodeURIComponent(searchString);
    axios.get("http://www.omdbapi.com/?apikey=62a1b7d1&s=" + urlEncodedSearchString)
        .then(function(response) {
            var responseData = response.data.Search;
            var movie = responseData.find(function(currentMovie){
                return currentMovie.imdbID == imdbID;
            });
            var watchlistJSON = localStorage.getItem("watchlist");
            var watchlist = JSON.parse(watchlistJSON);
            if(!watchlist){
                var watchlist = []
            };
            watchlist.push(movie);
            watchlistJSON = JSON.stringify(watchlist);
            localStorage.setItem("watchlist", watchlistJSON)
            console.log(localStorage.getItem("watchlist", watchlistJSON))
            document.getElementById(imdbID).innerHTML = "Added!"
        })
   
}


function renderMovies(movieArray) {
    var finalHTML = "";
    var moviesHTML = movieArray.map(function(currentMovie){
        if(localStorage.getItem("watchlist").includes(currentMovie.imdbID)){
            var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
            <img class="card-img-top" src="${currentMovie.Poster}" alt="movie poster">
            <div class="card-body">
              <h5 class="card-title">${currentMovie.Title}</h5>
              <p class="card-text">${currentMovie.Year}</p>
              <i>Already on your watchlist!</i>
            </div>
          </div>`
        } else {
        var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
                    <img class="card-img-top" src="${currentMovie.Poster}" alt="movie poster">
                    <div class="card-body">
                      <h5 class="card-title">${currentMovie.Title}</h5>
                      <p class="card-text">${currentMovie.Year}</p>
                      <button class="btn btn-primary" id="${currentMovie.imdbID}" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
                    </div>
                  </div>`
        }
        return movieHTML
    });

    finalHTML += moviesHTML.join("");
    return finalHTML;
}

document.addEventListener("DOMContentLoaded", function() {


document.getElementById("search-form").addEventListener("submit", function(e){
    e.preventDefault();
    var searchString = document.getElementById("search-form-bar").value;
    console.log(searchString)
    var urlEncodedSearchString = encodeURIComponent(searchString);
    axios.get("http://www.omdbapi.com/?apikey=62a1b7d1&s=" + urlEncodedSearchString)
        .then(function(response) {
            var responseData = response;
            document.getElementById("movies-container").innerHTML = renderMovies(response.data.Search);
        })

})
})