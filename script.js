const API_KEY = "29a0f7df";
const URL = "http://www.omdbapi.com/?apikey=29a0f7df&";

const userInput = document.querySelector(".input");
const searchResults = document.querySelector(".search__results");
const nominateBtn = document.querySelector(".nominate");
const removeBtn = document.querySelector(".remove");
const nonimationsList = document.querySelector(".nonimations__list");

let searchInput;

const getData = async function (input) {
  try {
    // const searchResult = e.target.value;
    if (input === "") return;
    const res = await fetch(
      `http://www.omdbapi.com/?s=${input}&apikey=29a0f7df&`
    );
    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

userInput.addEventListener("input", function (e) {
  const searchResult = e.target.value;
  getData(searchResult);
});



`
<div class="movie">
    <img class="movie__poster" src="https://sir.wdwnt.com/wdwnt.com/2020/06/hamilton-poster-7.jpg" alt="Movie Poster">
    <div class="movie__desc">
        <p class="movie__desc-title">Title: </p>
        <p class="movie__desc-year">Year: </p>
        <p class="movie__desc-genre">Genre: </p>
        <p class="nominate">Nominate <i class="fas fa-plus-square"></i></p>
    </div>
</div>
`;

`
<div class="nominee">
    <div class="nominee__desc">
        <img class="nominee__poster" src="https://sir.wdwnt.com/wdwnt.com/2020/06/hamilton-poster-7.jpg" alt="nominee Poster">
        <p class="nominee__desc-title">Title</p>
    </div>
    <p class="remove"><i class="fas fa-minus-square"></i> Remove</p>
</div>
`;
