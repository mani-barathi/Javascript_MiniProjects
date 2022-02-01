const tbody = document.querySelector("tbody");
const ths = document.querySelectorAll("th");
const searchInput = document.querySelector("input");
let userList = [];

const sortIndex = {
  id: 0,
  name: 0,
  city: 0,
};

function renderRows(users) {
  tbody.innerHTML = "";
  users.forEach((user) => {
    const rowHtml = `<tr>  
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.city}</td>
            </tr>`;
    tbody.innerHTML += rowHtml;
  });
}

async function fetchAndInsertUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  userList = data.map((user) => ({
    id: user.id,
    name: user.name,
    city: user.address.city,
  }));
  renderRows(userList);
}

function updateSortIndex(column) {
  if (sortIndex[column] == 0) sortIndex[column] = 1;
  else if (sortIndex[column] == 1) sortIndex[column] = 2;
  else sortIndex[column] = 0;
}

function sort(userArr, sortColumn) {
  const users = [...userArr];

  if (sortIndex[sortColumn] == 1) {
    users.sort((a, b) => {
      if (a[sortColumn] > b[sortColumn]) return 1;
      if (b[sortColumn] > a[sortColumn]) return -1;
      return 0;
    });
  } else if (sortIndex[sortColumn] == 2) {
    users.sort((a, b) => {
      if (a[sortColumn] > b[sortColumn]) return -1;
      if (b[sortColumn] > a[sortColumn]) return 1;
      return 0;
    });
  }
  return users;
}

// Driver Code
fetchAndInsertUsers();

ths.forEach((th) =>
  th.addEventListener("click", (e) => {
    const sortColumn = e.target.id;
    e.target.textContent = sortColumn;
    updateSortIndex(sortColumn);

    if (sortIndex[sortColumn] == 1) e.target.innerHTML += " &uArr;";
    else if (sortIndex[sortColumn] == 2) e.target.innerHTML += " &dArr;";

    const sortedUsers = sort(userList, sortColumn);
    renderRows(sortedUsers);
  })
);

searchInput.addEventListener("keyup", () => {
  const text = searchInput.value.trim().toLowerCase();

  const trs = tbody.querySelectorAll("tr");
  trs.forEach((tr) => {
    if (tr.innerText.toLowerCase().includes(text)) {
      tr.classList.remove("hide");
    } else {
      tr.classList.add("hide");
    }
  });
});
