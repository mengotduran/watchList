const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        console.log(movie)
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list')
            movieSearchBox.value = ""
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`)
            const movieDetails = await result.json()
            console.log(movieDetails)
            displayMovieDetails(movieDetails)
        })
    })
}

function displayBodyContent() {
   
}

const everything = document.getElementById('everything')
const bodyContent = document.getElementById("body-content")

function displayMovieDetails(details) {
    bodyContent.innerHTML = ""
    everything.style.backgroundColor="#171717"
    everything.style.height="100vh"
    everything.innerHTML += `
    <div class="mainBodyDetail">
    <div class="bodyDetails">
        <div class="flex1">
            <div class="img-details">
                <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
            </div>
            <div class="flex2">
                <div class="detailsTitles">
                    <h3>Title: ${details.Title}</h3>
                    <h4> ${details.Year}</h4>
                    <p class="star"><b><i class="fa-solid fa-star"></i></b> ${details.imdbRating}</p>
                </div>
                <div class="detailsTitleContents">
                    <p>${details.Runtime}</p>
                    <p>${details.Genre}</p>
                    <p class="plusText"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg> Watchlist</p>
                </div>
                <div class="detailsData">
                ${details.Plot}</h4>
                </div>
            </div>
        </div>
    </div> 
    </div>
    `
}