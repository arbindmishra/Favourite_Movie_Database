const addMovieModal = document.getElementById("add-modal"); //AddMovieOverlay
/* 
Two more ways to select add-modal:
1. const addMovieModal=document.querySelector('#add-modal');
2. const addMovieModal=document.body.children[1];
*/
const startAddMovieButton = document.querySelector("header button"); //AddMovie Button
/*
Other ways to select the button in <header>:
const startAddMovieButton = document.querySelector('header').lastElementChild;
*/
const addBackdrop = document.getElementById("backdrop"); //AddMovieBackDrop
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive"); //AddMovie-CancelButton
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling; //AddMovie-AddButton
const deleteMovieModal = document.getElementById("delete-modal"); //DeleteMovieOverlay

const userInputs = addMovieModal.querySelectorAll("input"); //AddMovie-ModalContent-InputValue

const entryTextSection = document.getElementById("entry-text"); //First UI(Reset)

const updateUI = () => {
  //UpdatesUI after Addition or Deletion of Movies
  if (movies.length === 0) {
    entryTextSection.style.display = "block"; //Makes the FirstUI visible
  } else {
    entryTextSection.style.display = "none"; //Hides the FirstUI
  }
};

const toggleBackDrop = () => {
  //Switches the background color
  addBackdrop.classList.toggle("visible");
};

const backdropClickHandler = () => {
  //Closes the overlays when clicked outside the overlays
  closeMovieModal();
  closeMovieDeletionModal();
};

const showMovieModal = () => {
  // Directly connected to AddMovie Button
  addMovieModal.classList.add("visible"); //AddMovie-Overlay made visible
  toggleBackDrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible"); //Hides the AddMovie-Overlay
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  //Adds a box with all details given by the user in AddMovie Overlay
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image"> 
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info"> 
      <h2>${title}</h2>
      <p>${rating} / 5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const clearMovieInput = () => {
  //Clears the Input Sections of Add Movie after Add/Cancel
  userInputs[0].value = "";
  userInputs[1].value = "";
  userInputs[2].value = "";
  /* Another way using for loop
      for(const usrInput of userInputs){
       usrInput.value="";   
      }
    */
};

const movies = []; //Stores the Input given by user
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    //Checks if entered value are not empty/ invalid
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert(" Please enter a valid value for Rating(between 1 to 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie); //Pushes the input give by user to movies[]
  console.log(movies);
  clearMovieInput();
  closeMovieModal();
  toggleBackDrop();
  //Sends the input value to render so that it can be shown on the UI
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const cancelAddMovieHandler = () => {
  //Works when cancel button is clicked in the Add Movie Overlay
  clearMovieInput();
  closeMovieModal();
  toggleBackDrop();
};

const startDeleteMovieHandler = (movieId) => {
  //Helps in deletion of the movie present in database
  deleteMovieModal.classList.add("visible");
  toggleBackDrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  const confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const closeMovieDeletionModal = () => {
  //Closes the Movie Deletion Confirmation Overlay
  toggleBackDrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  //Deletes the confirmed movie from the database
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  updateUI();
  closeMovieDeletionModal();
};

startAddMovieButton.addEventListener("click", showMovieModal); //AddMovie Button Connected to showMovieModal
addBackdrop.addEventListener("click", backdropClickHandler); //Works when clicked elsewhere than Overlay box
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
