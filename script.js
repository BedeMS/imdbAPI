const API_KEY = "29a0f7df";
const URL = "http://www.omdbapi.com/?apikey=29a0f7df&";

const userInput = document.querySelector(".input");
const searchResults = document.querySelector(".search__results");
const searchBanner = document.querySelector(".search__banner");
const nominateBtn = document.querySelector(".nominate");
const removeBtn = document.querySelector(".remove");
const nonimationsList = document.querySelector(".nonimations__list");

let searchInput;

const getData = async function (input) {
  try {
    // if (input === "") return;
    const res = await fetch(
      `http://www.omdbapi.com/?s=${input}&apikey=29a0f7df&`
    );
    const data = await res.json();
    console.log(data);
    if (data.Response === "False") throw new Error(data.Error);
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
              <p class="movie__desc-title">Title: ${movie.Title}</p>
              <p class="movie__desc-year">Year: ${movie.Year}</p>
              <p class="movie__desc-genre">Genre: ${movie.Genre}</p>
              <p class="nominate">Nominate <i class="fas fa-plus-square"></i></p>
          </div>
      </div>
      `;
  }).join("");
}

function nomineesMarkUp() {
  return `
        <div class="nominee">
            <div class="nominee__desc">
                <img class="nominee__poster" src="https://sir.wdwnt.com/wdwnt.com/2020/06/hamilton-poster-7.jpg" alt="nominee Poster">
                <p class="nominee__desc-title">Title</p>
            </div>
            <p class="remove"><i class="fas fa-minus-square"></i> Remove</p>
        </div>
`;
}

function errMessage(data) {
  return `<h1>${data}<h1>`;
}

userInput.addEventListener("input", function (e) {
  const searchResult = e.target.value;
  getData(searchResult);
});

`
<div class="nominee">
    <div class="nominee__desc">
        <img class="nominee__poster" src="https://sir.wdwnt.com/wdwnt.com/2020/06/hamilton-poster-7.jpg" alt="nominee Poster">
        <p class="nominee__desc-title">Title</p>
    </div>
    <p class="remove"><i class="fas fa-minus-square"></i> Remove</p>
</div>
`;
