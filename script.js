const wrapper = document.querySelector(".wrapper"),
  searchInput = document.querySelector("input"),
  synonyms = document.querySelector(".synonyms .list"),
  volumeIcon = document.querySelector(".word i"),
  removeIcon = document.querySelector(".material-symbols-outlined"),
  infoText = document.querySelector(".info-text");
let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search for another word.`;

  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;

    audio = new Audio(`${result[0].phonetics[0].audio}`);

    if (result[0].meanings[0].synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.innerHTML = "";
      synonyms.parentElement.style.display = "block";

      for (let i = 0; i < 5; i++) {
        let tag = `<span onclick="search('${result[0].meanings[0].synonyms[i]}')">${result[0].meanings[0].synonyms[i]}</span>`;
        console.log(`${result[0].meanings[0].synonyms[i]}`);
        if (result[0].meanings[0].synonyms[i] === undefined) {
          return;
        } else {
          synonyms.insertAdjacentHTML("beforeend", tag);
        }
      }
    }
  }
}

function search(newWord) {
  searchInput.value = newWord;
  fetchApi(newWord);
}

function fetchApi(word) {
  wrapper.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url).then(promise => promise.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
})

volumeIcon.addEventListener("click", () => {
  audio.play();
})

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();

  wrapper.classList.remove("active");
  infoText.style.color = "#9a9a9a";
  infoText.innerHTML = "Type a word and press enter to get meaning, example, pronunciation and synonims of that typed word.";
})