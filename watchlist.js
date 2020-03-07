function removeWatchlist(imdbID){ 
    var movie = JSON.parse(localStorage.getItem("watchlist")).findIndex(function(currentMovie){
        return currentMovie.imdbID == imdbID;
    });
    console.log(movie)
    watchlist = JSON.parse(localStorage.getItem("watchlist"))
    watchlist.splice(movie, 1);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlistJSON);
    document.getElementById("movies-container").innerHTML = renderMovies(JSON.parse(localStorage.getItem("watchlist")));
}


function renderMovies(movieArray) {
    var finalHTML = "";
    var moviesHTML = movieArray.map(function(currentMovie){
        var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
                    <img class="card-img-top" src="${currentMovie.Poster}" alt="movie poster">
                    <div class="card-body">
                      <h5 class="card-title">${currentMovie.Title}</h5>
                      <p class="card-text">${currentMovie.Year}</p>
                      <button class="btn btn-primary" onclick="removeWatchlist('${currentMovie.imdbID}')">Remove</button>
                    </div>
                  </div>`
            return movieHTML
    });

    finalHTML += moviesHTML.join("");
    return finalHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("movies-container").innerHTML = renderMovies(JSON.parse(localStorage.getItem("watchlist"))); 
});

