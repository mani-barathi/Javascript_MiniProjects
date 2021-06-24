const usersContainer = document.querySelector(".users-container");
const loadingText = document.querySelector(".app-loading");
const pageBtns = document.querySelectorAll(".page-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const perPage = 7;
const lastPage = 9;
const firstPage = 1;
let page = 1;

const toggleLoading = (loading) => {
  loadingText.style.display = loading ? "block" : "none";
  usersContainer.style.display = !loading ? "block" : "none";
};

const showHideNextPrevBtns = () => {
  nextBtn.disabled = page === lastPage;
  prevBtn.disabled = page === firstPage;
};

const highlightCurrentPageBtn = () => {
  Array.from(pageBtns).forEach((pageBtn) => {
    if (pageBtn.dataset.no == page) {
      pageBtn.classList.add("active");
      pageBtn.disabled = true;
    } else {
      pageBtn.classList.remove("active");
      pageBtn.disabled = false;
    }
  });
};

const renderUsers = (users) => {
  let usersContainerHTML = "";
  for (let user of users) {
    const name = user.name.first + " " + user.name.last;
    const country = user.location.country;
    const thumbnail = user.picture.thumbnail;
    const userHTML = `
      <div class="user">
	      <img src="${thumbnail}" class="user-image">
	      <div class="user-info">
		      <h3>${name}</h3>	
		      <p>${country}<p3>
	      </div>
      </div>`;
    usersContainerHTML += userHTML;
  }
  usersContainer.innerHTML = usersContainerHTML;
};

const fetchRandomUsers = async (pageNo) => {
  toggleLoading(true);
  page = pageNo;
  try {
    const response = await fetch(
      `https://randomuser.me/api/?page=${pageNo}&results=${perPage}`
    );
    const { results: data } = await response.json();
    renderUsers(data);
    highlightCurrentPageBtn();
    showHideNextPrevBtns();
  } catch (e) {
    console.log(e);
    alert("someting went wrong while fetching data");
  }
  toggleLoading(false);
};

nextBtn.addEventListener("click", () => fetchRandomUsers(++page));
prevBtn.addEventListener("click", () => fetchRandomUsers(--page));
Array.from(pageBtns).forEach((pageBtn) => {
  pageBtn.addEventListener("click", (e) =>
    fetchRandomUsers(parseInt(e.target.dataset.no))
  );
});

fetchRandomUsers(page);
