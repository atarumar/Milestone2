const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const secureHomeNetwork = [
  "Change default router passwords",
  "Enable WPA3 encryption",
  "Set up a guest network",
  "Use a strong password for your Wi-Fi network",
  "Update the router firmware",
  "Disable remote management",
  "Enable firewall protection",
  "Monitor network traffic for unusual activity",
  "Regularly review security settings"
];

const listItems = [];
let dragStartIndex;

function createList() {
  secureHomeNetwork
    .map((item) => ({ value: item, sort: Math.random() }))  
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${item}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addListeners();
}

function addListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  let isCorrect = true; 
  
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable p").innerText.trim();

    if (personName !== secureHomeNetwork[index].trim()) {
      listItem.classList.add("wrong");
      listItem.classList.remove("right");
      isCorrect = false; 
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });

  if (isCorrect) {
    const checkBtn = document.getElementById("check");
    checkBtn.innerHTML = 'Back to Home <i class="fas fa-home"></i>'; 
    checkBtn.removeEventListener("click", checkOrder); 

    checkBtn.addEventListener("click", () => {
      window.location.href = "/landingpage/index.html"; 
    });
  }
}

createList();
check.addEventListener("click", checkOrder);
