const itemContainers = document.querySelectorAll(".item-container");
const items = document.querySelectorAll(".item");
const favorites = document.querySelector(".favorites");

function isFavouritesFull() {
  const noOfItems = [...favorites.querySelectorAll(".item")].length;
  return noOfItems === 2 ? true : false;
}

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

itemContainers.forEach((itemContainer) => {
  itemContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    // if the itemContainer is favorites and it already has 2 items, then return
    if (itemContainer === favorites && isFavouritesFull()) return;

    const draggingItem = document.querySelector(".dragging");
    // get any item that is below our mouse position
    const afterElement = getDragAfterElement(itemContainer, e.clientY);

    if (!afterElement)
      //  no element append dragging item to container
      itemContainer.appendChild(draggingItem);
    // insert dragging item after the particular item in container
    else itemContainer.insertBefore(draggingItem, afterElement);
  });
});

function getDragAfterElement(itemContainer, mousePositionY) {
  // get all the items inside the itemContainer whcich is not dragged currently
  const items = [...itemContainer.querySelectorAll(".item:not(.dragging)")];

  const afterElement = items.reduce(
    (closest, item) => {
      const { top, height } = item.getBoundingClientRect();
      // calculate the offset from our current MousePosition
      console.log(top, "----", height);
      const offset = mousePositionY - top - height / 2;

      // if the offset is negative and it is gretor than the previous offset
      if (offset < 0 && offset > closest.offset)
        return { offset: offset, element: item };
      else return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ); // initial closest

  // console.log(afterElement.element.innerText)

  return afterElement.element;
}
