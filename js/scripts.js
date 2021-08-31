"use strict";

// ***** ON PAGE LOAD *****
// TODO: Display a "loading..." message
// TODO: Make an AJAX request to get a listing of all the movies
// TODO: When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives

// ***** ALLOW USERS TO ADD NEW MOVIES *****
// TODO: Create a form for adding a new movie that has fields for the movie's title and rating
// TODO: When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

// ***** ALLOW USERS TO EDIT EXISTING MOVIES *****
// TODO: Give users the option to edit an existing movie
// TODO: A form should be pre-populated with the selected movie's details
// TODO: Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.

// ***** DELETE MOVIES *****
// TODO: Each movie should have a "delete" button
// TODO: When this button is clicked, your javascript should send a DELETE request


const URL = 'https://faithful-boatneck-trowel.glitch.me/movies';

let HTML = '';

// *** ON PAGE LOAD ***
function generateMovies() {
    fetch(URL)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            $('#loading').replaceWith('');

            data.forEach((movie, index, movieCollection) => {
                HTML = `<div class="movie-card">
                        <h5>${movie.title}</h5>
                        <h6>Rating: ${movie.rating}</h6>
                    </div>
                    <br>`
                $('#movie-section').append(HTML);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

generateMovies();

// *** WHEN SUBMITTED, CREATES NEW MOVIE OBJECT AND SENDS TO SERVER WITH POST REQUEST
$('#submit-new-movie').click(function(e) {
    e.preventDefault();
    const moviePost = {id: '', title: $('#user-movie-title').val(), rating: $('#user-rating').val()};

    const newMovieOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };

    fetch(URL, newMovieOptions)
        .then(response => response.json())
        .then(function(newPost) {
            console.log(newPost);
            location.reload();
        });
    // generateMovies();
})
