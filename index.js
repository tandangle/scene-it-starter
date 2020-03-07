function saveToWatchlist(imdbID){ 
    console.log(imdbID);
    var movie = movieData.find(function(currentMovie){
        return currentMovie.imdbID == imdbID;
    });
    var watchlistJSON = localStorage.getItem("watchlist");
    var watchlist = JSON.parse(watchlistJSON);
    if(!watchlist){
        var watchlist = []
    };
    watchlist.push(movie);
    // watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem("watchlist", watchlist)
    console.log(localStorage.getItem("watchlist"))
}

document.addEventListener("DOMContentLoaded", function() {
    
    
    function renderMovies(movieArray) {
        var finalHTML = "";
        var moviesHTML = movieArray.map(function(currentMovie){
            var movieHTML = `<div class="card movie" id="movie-card" style="width: 18rem;">
						<img class="card-img-top" src="${currentMovie.Poster}" alt="movie poster">
						<div class="card-body">
						  <h5 class="card-title">${currentMovie.Title}</h5>
                          <p class="card-text">${currentMovie.Year}</p>
                          <button class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
						</div>
                      </div>`
                return movieHTML
        });

        finalHTML += moviesHTML.join("");
        return finalHTML;
    }
    document.getElementById("movies-container").innerHTML = renderMovies(movieData);

    document.getElementById("search-form").addEventListener("submit", function(e){
        e.preventDefault();
        document.getElementById("movies-container").innerHTML = renderMovies(movieData);
   })


   
});