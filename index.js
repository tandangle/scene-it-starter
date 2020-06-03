function saveToWatchlist(imdbID){ 
    var searchString = document.getElementById("search-form-bar").value;
    console.log(searchString)
    var urlEncodedSearchString = encodeURIComponent(searchString);
    axios.get("https://www.omdbapi.com/?apikey=62a1b7d1&s=" + urlEncodedSearchString)
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
        // This conditional statmement checks to see if a given movie is already on the localStorage array watchlist. If it is, it renders a static text
        // that the movie is on your watchlist
        if (localStorage.getItem("watchlist") && localStorage.getItem("watchlist").includes(currentMovie.imdbID)){
            var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
            <img class="card-img-top watchlist" src="${currentMovie.Poster}" alt="movie poster">
            <div class="card-body">
              <h5 class="card-title">${currentMovie.Title}</h5>
              <p class="card-text">${currentMovie.Year}</p>
              <i>Already on your watchlist!</i>
            </div>
          </div>`
        // This conditional checks to see if the given movie has already been watched by comparing it to the array watchedList. If it has been watched, 
        // render "You've watched this movie" instead of a button
        } else if (localStorage.getItem("watchedlist") && localStorage.getItem("watchedlist").includes(currentMovie.imdbID)){
            var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
            <img class="card-img-top watched" src="${currentMovie.Poster}" alt="movie poster">
            <div class="card-body">
              <h5 class="card-title">${currentMovie.Title}</h5>
              <p class="card-text">${currentMovie.Year}</p>
              <i>You've watched this movie!</i>
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
    axios.get("https://www.omdbapi.com/?apikey=62a1b7d1&s=" + urlEncodedSearchString)
        .then(function(response) {
            var responseData = response;
            document.getElementById("movies-container").innerHTML = renderMovies(response.data.Search);
        })

})
})