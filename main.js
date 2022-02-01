const linksContainer = document.getElementById("links-container");

const links = [
  { id: 1, name: "Bookmark App", url: "./Bookmark-app/index.html" },
  { id: 2, name: "CubeTimer", url: "./CubeTimer/index.html" },
  { id: 3, name: "Drag Drop", url: "./Drag_Drop/index.html" },
  { id: 4, name: "Filterable list", url: "./Filterable_list/index.html" },
  { id: 5, name: "Form Validation", url: "./Form_Validation/index.html" },
  { id: 6, name: "Github Profile", url: "./Github_Profile/index.html" },
  { id: 7, name: "Image Carousel", url: "./Image_Carousel/index.html" },
  { id: 8, name: "Infinite scroll", url: "./Infinite_scroll/index.html" },
  { id: 9, name: "Momentum Clone", url: "./Momentum-Clone/index.html" },
  { id: 10, name: "Movie Desk", url: "./Movie_desk/index.html" },
  { id: 11, name: "Pagination", url: "./Pagination/index.html" },
  {
    id: 12,
    name: "Password Generator",
    url: "./Password_Generator/index.html",
  },
  { id: 13, name: "Pomodoro Timer", url: "./Pomodoro_Timer/index.html" },
  { id: 14, name: "Quote generator", url: "./Quote_generator/index.html" },
  {
    id: 15,
    name: "Rock Paper Scissors",
    url: "./Rock_Paper_Scissors/index.html",
  },
  {
    id: 16,
    name: "Sortable Searchable Table",
    url: "./Sortable_Searchable_Table/index.html",
  },
  {
    id: 17,
    name: "Sorting Visualizer",
    url: "./Sorting_Visualizer/index.html",
  },
  { id: 18, name: "Text Editor", url: "./Text_Editor/index.html" },
  { id: 19, name: "TicTacToe", url: "./TicTacToe/index.html" },
  { id: 20, name: "TodoList", url: "./TodoList/index.html" },
  { id: 21, name: "Weather App", url: "./Weather_App/index.html" },
];

function renderLinks() {
  let linksHtml = "";

  links.forEach((link) => {
    const aTag = `
			<a
			  class="
				project__div
				d-block
				col
				text-center
				py-2
				text-dark
				font-weight-bold
				text-decoration-none
			  "
			  target="_blank"
			  href="${link.url}"
			  >${link.name}</a
			>
		`;
    linksHtml += aTag;
  });

  linksContainer.innerHTML = linksHtml;
}

renderLinks();
