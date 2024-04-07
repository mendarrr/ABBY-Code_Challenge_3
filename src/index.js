// Your code here
// Declare the storage for all the film tickets available in the theater
const db = "http://localhost:3000/films";

// What happens when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getMovies();
// Grab the buy-ticket id which is a button essentially
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});
function getMovies() {
    // The source is the localhoat url
        fetch(db).then(res => res.json()).then(movies => {
            movies.forEach(movie => {renderMovieList(movie)})
    // User to see the first movie's details
            const firstMovie = document.querySelector("#id1");
            firstMovie.dispatchEvent(new Event("click"));
        })
    }

    
    function renderMovieList(movie) {
        const li = document.createElement("li");
        li.textContent = `${movie.title}`;
        li.id = "id" + movie.id;

// Add a delete button that deletes a movie from the list and server
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
 

 // Stop event from bubbling up the delete button
            event.stopPropagation();
            deleteMovie(movie.id);
        });
    
        li.appendChild(deleteButton);
    
        const ul = document.querySelector("#films");
        ul.appendChild(li);
        li.classList.add("film");
        li.classList.add('item');
        li.addEventListener("click", () => {handleMovieClick(movie)});
    }
    
// Function to handle the deletion of a movie
function deleteMovie(movieId) {
    fetch(`${db}/${movieId}`, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
            // Remove the movie from the list in the UI
            const movieElement = document.querySelector("#id" + movieId);
            movieElement.remove();
        } else {
            throw new Error('Failed to delete movie');
        }
    })
    .catch(error => {
        console.error('Error deleting movie:', error);
    });
}

// Grab the poster id
function handleMovieClick(movie) {
    const poster = document.querySelector("img#poster")
    poster.src = movie.poster;
    poster.alt = movie.title;
    const info = document.querySelector("#showing");
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime+" minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}

// Calculate the number of tickets remaining after buying
function handleBuyTicket(a) {
    const ticketDiv = document.querySelector("#ticket-num");
    const tickets = ticketDiv.textContent.split(" ")[0];
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
    }
    else if (tickets == 0) {
        alert("No more tickets!");//output is given to the user that the tickets are sold out
        a.target.classList.add("sold-out");
        a.target.classList.remove("orange");
    }
}