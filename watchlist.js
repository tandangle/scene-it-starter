document.addEventListener("DOMContentLoaded", function() {
    console.log(JSON.parse(localStorage.getItem("watchlist")));

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
    document.getElementById("movies-container").innerHTML = renderMovies(JSON.parse(localStorage.getItem("watchlist")));

   
});