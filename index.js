
const movieSearchBox = document.getElementById('movie-search-box')
const contents = document.getElementById("contents") 
const bodyContent = document.getElementById("body-content")
const mainDisplay = document.getElementById("main-display")
const mainContent = document.getElementById("main-content")

async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=full&apikey=8f03021`
    const res = await fetch(`${URL}`)
    const data = await res.json() 
    if (data.Response == "True") displayMovieList(data.Search)
    console.log(data)
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim()
    if(searchTerm.length > 0){
        mainContent.classList.remove('hide-search-list')
        loadMovies(searchTerm)
    } else {
        mainContent.classList.add('hide-search-list')
    }
}

function displayMovieList(movies) {
    mainContent.innerHTML = ""
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement("div")
        movieListItem.dataset.id = movies[i].imdbID
        if(movies[i].Poster != 'N/A') {
            moviePoster = movies[i].Poster
        } else {
            moviePoster = "image_not_found.png"
        }

        movieListItem.innerHTML = `
        <div class="main-display">
            <div class="displayBody">
                <div class="imgDisplay">
                    <img src="${moviePoster}">
                </div>
                <div class="displaySubContent">
                    <div class="subMainDisplay">
                        <div class="displayHeader">
                            <h3>Blade Runner</h3>
                            <span>${movies[i].Title} 8.1
                            </span>
                        </div>
                        <div class="displayTitles">
                            <h2>${movies[i].Title}</h2>
                            <h3>${movies[i].Title}</h3>
                            <p>${movies[i].Title}</p>
                        </div>
                        <div class="displayText">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi explicabo quam et, nulla cumque similique unde quibusdam. Numquam nesciunt error fugiat totam, ab vitae recusandae quaerat? Voluptatem pariatur, mollitia id inventore nobis provident neque amet aut blanditiis. Ullam eius, fugiat eaque accusamus totam, ipsum consequuntur voluptatum, rerum amet repellat dolore.
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        mainContent.appendChild(movieListItem) 
    }
}
