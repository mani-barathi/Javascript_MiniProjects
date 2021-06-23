const names = [
  "Annabell Helper",
  "Laure Cheng",
  "Bev Dudding",
  "Clinton Hampshire",
  "Millard Soderman",
  "Palmira Hotz",
  "Fredric Ulloa",
  "Renetta Steffes",
  "Martha Bachelder",
  "Alene Burchard",
  "Augustus Glatz",
  "Youlanda Cardona",
  "Garnett Brignac",
  "Buffy Vedder",
  "Mary Storms",
  "Ervin Salsman",
  "Marielle Rambin",
  "Rueben Cothren",
  "Monnie Whipple",
  "Jayson Sullivan",
];

names.sort();

const listElement = document.querySelector(".list-group"); // ul Tag
const searchField = document.getElementById("search-field"); // search input

function renderNames(nameList, searchValue = "") {
  let firstCharacter = "";
  let listElementInnerHTML = "";

  for (let name of nameList) {
    // to display the Starting Letter (Indexing by Starting Letter) in <h4> Tag
    if (name[0] != firstCharacter) {
      firstCharacter = name[0];
      listElementInnerHTML += `<h4 class="ml-3 mt-1">${firstCharacter}</h4>`;
    }

    if (searchValue) {
      const startIndex = name.toLowerCase().indexOf(searchValue);
      const endIndex = startIndex + searchValue.length - 1;
      let markedName = "";
      console.log(
        `'${searchValue}' is in '${name}' at (${startIndex}, ${endIndex}) `
      );

      // to Highlight the SearchValue in the name using <mark> Tag
      for (let i = 0; i < name.length; i++) {
        if (i === startIndex)
          markedName += `<mark class="bg-warning px-0 m-0 py-0">`;

        markedName += name[i];

        if (i === endIndex) markedName += `</mark>`;
      }
      listElementInnerHTML += `<li class="list-group-item">${markedName}</li>`;
    } else {
      listElementInnerHTML += `<li class="list-group-item">${name}</li>`;
    }
  }

  listElement.innerHTML = listElementInnerHTML;
}

function handleInputChange() {
  const searchValue = searchField.value.toLowerCase();
  const filteredNames = [];

  for (let name of names) {
    const isNameContains = name.toLowerCase().indexOf(searchValue) >= 0;
    if (isNameContains) filteredNames.push(name);
  }

  renderNames(filteredNames, searchValue);
}

// Event listener for key
searchField.addEventListener("keyup", handleInputChange);
// render all the names once at the start of the page
renderNames(names);
