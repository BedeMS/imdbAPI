const API_KEY = "29a0f7df";

const userInput = document.querySelector(".input");
const searchResults = document.querySelector(".search__results");
const searchBanner = document.querySelector(".search__banner");
const mainBanner = document.querySelector(".main__banner");
const nominationsList = document.querySelector(".nominations__list");
const nominations = document.querySelector(".nominations");

let searchInput, nominatedMovies;

const fetchData = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getData = async function (input) {
  try {
    const data = await fetchData(
      `http://www.omdbapi.com/?s=${input}&apikey=29a0f7df&`
    );

    render(data, false);
  } catch (err) {
    if (err.message === "Incorrect IMDb ID.") {
      searchBanner.classList.remove("show__banner");
    } else {
      render(err.message, true);
    }
  }
};

const render = function (data, err = false) {
  if (err) {
    const markUp = errMessage(data);
    searchBanner.classList.add("show__banner");
    insertMarkUp(searchBanner, markUp);
    insertMarkUp(searchResults, "");
  } else {
    searchBanner.classList.remove("show__banner");
    const markUp = moviesListMarkUp(data);
    insertMarkUp(searchResults, markUp);
  }
};

function insertMarkUp(element, markUp = "") {
  element.innerHTML = "";
  element.insertAdjacentHTML("beforeend", markUp);
}

function moviesListMarkUp(data) {
  if (data === "") return "";
  return data.Search.map((movie) => {
    return `
      <div class="movie" id=${movie.imdbID}>
          <img class="movie__poster" src=${movie.Poster} alt=${movie.Title}>
          <div class="movie__desc">
              <p class="movie__desc-title">Title: <span class="movie-title">${movie.Title}</span></p>
              <p class="movie__desc-year">Year: <span class="movie-year">${movie.Year}</span></p>
              <p class="movie__desc-year">Year: <span class="movie-year">${movie.Genre}</span></p>
              <p class="nominate">Nominate <i class="fas fa-plus-square"></i></p>
          </div>
      </div>
      `;
  }).join("");
}

function nomineesMarkUp(data) {
  if (!data.length) return;
  return data
    .map((movie) => {
      return `
            <div class="nominee" id=${movie.imdbID}>
                <div class="nominee__desc">
                    <img class="nominee__poster" src=${movie.Poster} alt="nominee Poster">
                    <p class="nominee__desc-title">${movie.Title}</p>
                </div>
                <p class="remove"><i class="fas fa-minus-square"></i> Remove</p>
            </div>
        `;
    })
    .join("");
}

function errMessage(data) {
  return `<h1>${data}<h1>`;
}

function checkForRepeat(id) {
  const repeatMovie = nominatedMovies.filter((movie) => movie.imdbID === id);
  if (repeatMovie.length !== 0) {
    const markUp = errMessage("You've already nominated this Movie");
    insertMarkUp(mainBanner, markUp);
    mainBanner.classList.add("show__banner");
    setTimeout(() => {
      mainBanner.classList.remove("show__banner");
    }, 3000);
    return true;
  }
}

function checkNominationLimit() {
  if (nominatedMovies.length === 5) {
    const markUp = errMessage("There is a limit to 5 nominations!");
    insertMarkUp(mainBanner, markUp);
    mainBanner.classList.add("show__banner");
    setTimeout(() => {
      mainBanner.classList.remove("show__banner");
    }, 3000);
    return true;
  }
}

async function addNominee(movieId) {
  if (checkNominationLimit()) return;
  if (checkForRepeat(movieId)) return;

  const movie = await fetchData(
    `http://www.omdbapi.com/?i=${movieId}&apikey=29a0f7df&`
  );

  nominatedMovies.unshift(movie);

  localStorage.setItem("nominees", JSON.stringify(nominatedMovies));

  const markUp = nomineesMarkUp(nominatedMovies);
  insertMarkUp(nominationsList, markUp);
  mainBanner.classList.remove("show__banner");
}

function removeNominee(movieId) {
  mainBanner.classList.remove("show__banner");
  nominatedMovies = nominatedMovies.filter((movie) => movie.imdbID !== movieId);
  localStorage.setItem("nominees", JSON.stringify(nominatedMovies));
  const markUp = nomineesMarkUp(nominatedMovies);
  insertMarkUp(nominationsList, markUp);
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("nominate")) {
    const movie = e.target.closest(".movie");
    addNominee(movie.id);
    return;
  }
  if (e.target.classList.contains("remove")) {
    const movie = e.target.closest(".nominee");
    removeNominee(movie.id);
    return;
  }
  if (e.target.closest(".box__open")) {
    //   console.log(nominations)
    nominations.style.transform = "translateX(-100%)";
  }
  if (e.target.classList.contains("box__close")) {
    nominations.style.transform = "translateX(100%)";
  }
});

userInput.addEventListener("input", function (e) {
  const searchResult = e.target.value;
  getData(searchResult);
});

const init = function () {
  localStorage.getItem("nominees") === null
    ? (nominatedMovies = [])
    : (nominatedMovies = JSON.parse(localStorage.getItem("nominees")));

  const markUp = nomineesMarkUp(nominatedMovies);
  insertMarkUp(nominationsList, markUp);
};

init();
