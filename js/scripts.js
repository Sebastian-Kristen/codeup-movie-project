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



const URL = 'https://ribbon-fluff-clipper.glitch.me/movies';



// *** ON PAGE LOAD ***
function generateMovies() {
    fetch(URL)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            $('#loading').replaceWith('');
            let HTML = '';
            data.forEach(movie => {
                HTML += `<div class="movie-card">
                        <h5 contenteditable="true" id="edit">${movie.title}</h5>
                        <h6 contenteditable="true" id="edit">Rating: ${movie.rating}</h6>
                        <button type="button" class="delete" id="${movie.id}">Delete</button> 
                    </div>
                    <br>`
            });
            $('.movies-list').replaceWith(HTML)
        })
        .catch(error => {
            console.log(error);
        });
}

generateMovies();



// *** WHEN SUBMITTED, CREATES NEW MOVIE OBJECT AND SENDS TO SERVER WITH POST REQUEST ***
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

    const deleteOptions = {
        method: 'DELETE'
    };

    fetch(URL, newMovieOptions)
        .then(response => response.json())
        .then(function(newPost) {
            console.log(newPost);
            let HTML = `<div class="movie-card">
                        <h5>${newPost.title}</h5>
                        <h6>Rating: ${newPost.rating}</h6>
                    </div>
                    <br>`
            $('#movie-section').append(HTML);
        });
});


// *** DELETE POST FUNCTION ***
function deletePost(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            console.log(`Successfully deleted movie with id of ${id}`)
        })
        .catch(console.error)
}


// *** DELETE BUTTON FUNCTIONALITY ***
const delay = 1000;

let timeoutForDelete = setTimeout(function() {
    $('.delete').click(function(e) {
        e.preventDefault();
        var id = $(e.target).attr('id');
        deletePost(id);
        // location.reload(true);
    });
}, delay);



// *** EDIT BUTTON FUNCTION ***
$("#update").click(function(e) {
    e.preventDefault();
    alert("clicked!");
});

const editMovieTitle = movie => fetch(`${URL}/${movie.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    });


fetch(URL, editMovieTitle)
    .then(response => response.json())
    .then(function(editedPost) {
        console.log(editedPost);
        let HTML = `<div class="movie-card" id="${editedPost.id}">
                        <h5 contenteditable="true">${editedPost.title}</h5>
                        <h6 contenteditable="true">Rating: ${editedPost.rating}</h6>
                    </div>
                    <br>`
        $('').replaceWith(HTML);
    });

















