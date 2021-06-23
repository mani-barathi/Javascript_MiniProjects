const itemContainer = document.querySelector(".item__container");
const modalContainer = document.querySelector(".modal");
const modalForm = document.querySelector(".modal__form");
const bookmarkNameField = document.querySelector("#bookmark-name");
const bookmarkLinkField = document.querySelector("#bookmark-link");
const modalFormError = document.querySelector(".modal__formError");

const expression =
  /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const urlRegex = new RegExp(expression);

let bookmarks = [];

function displayModal() {
  modalContainer.style.display = "flex";
}

function closeModal() {
  bookmarkNameField.value = "";
  bookmarkLinkField.value = "";
  modalFormError.textContent = "";
  modalContainer.style.display = "none";
}

// Utility functions
function createCustomElement(element, classes = []) {
  const newEl = document.createElement(element);
  newEl.classList.add(...classes);
  return newEl;
}

function renderBookmark(bookmarkName, bookmarkLink) {
  const divItem = createCustomElement("div", ["item", "d-flex"]);
  const divBtnContainer = createCustomElement("div", ["item__btnContainer"]);
  const btnItemClose = createCustomElement("span", ["item__closeBtn"]);
  const divMainContainer = createCustomElement("div", [
    "item__mainContainer",
    "align-items-center",
    "d-flex",
  ]);
  const imgIcon = createCustomElement("img", ["item__icon"]);
  const aTag = createCustomElement("a", ["item__link"]);

  btnItemClose.textContent = "X";
  btnItemClose.setAttribute("onclick", "deleteBookmark(event)");
  imgIcon.src = `https://s2.googleusercontent.com/s2/favicons?domain=${bookmarkLink}`;
  aTag.href = bookmarkLink;
  aTag.target = "_blank";
  aTag.textContent = bookmarkName;

  divBtnContainer.appendChild(btnItemClose);
  divMainContainer.appendChild(imgIcon);
  divMainContainer.appendChild(aTag);
  divItem.appendChild(divBtnContainer);
  divItem.appendChild(divMainContainer);

  itemContainer.appendChild(divItem);
}

function addBookmark(bookmarkName, bookmarkLink) {
  bookmarks = [...bookmarks, { name: bookmarkName, link: bookmarkLink }];
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
}

function deleteBookmark(event) {
  const item = event.target.parentNode.parentNode;
  let link = item.querySelector(".item__link").href;

  if (link[link.length - 1] == "/") {
    link = link.substring(0, link.length - 1);
  }

  for (let i = 0; i < bookmarks.length; i++) {
    if (link === bookmarks[i].link) {
      bookmarks.splice(i, 1);
      localStorage.setItem("bookmark", JSON.stringify(bookmarks));
      item.classList.add("fade-down"); // giving a little transition effect
      item.addEventListener("transitionend", () => {
        item.remove();
      });
      break;
    }
  }
}

function fetchBookmarks() {
  let temp = localStorage.getItem("bookmark");
  if (temp) bookmarks = JSON.parse(temp);
  else
    bookmarks = [
      { name: "Mani 's GitHub", link: "https://github.com/mani-barathi" },
    ];
}

function handleBookmarkForm(event) {
  event.preventDefault();
  let bookmarkName = bookmarkNameField.value;
  let bookmarkLink = bookmarkLinkField.value;

  if (!bookmarkLink.includes("https://", "http://"))
    bookmarkLink = `https://${bookmarkLink}`;

  if (!bookmarkLink.match(urlRegex)) {
    modalFormError.textContent = "Not a Valid URL!";
  } else {
    addBookmark(bookmarkName, bookmarkLink);
    renderBookmark(bookmarkName, bookmarkLink);
    closeModal();
  }
}

// EventListners
modalForm.addEventListener("submit", handleBookmarkForm);
window.addEventListener("click", (e) =>
  e.target === modalContainer ? closeModal() : false
);

// retrive the Bookmarks from localStorage and render it to window (on the load of the webpage)
fetchBookmarks();
bookmarks.forEach((bookmark) => renderBookmark(bookmark.name, bookmark.link));
