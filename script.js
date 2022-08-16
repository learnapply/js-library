let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.isRead ? "read" : "not read yet"
  }`;
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#read").checked;

  addToLibrary(new Book(title, author, pages, (isRead ? "read" : "not read")));

  displayAllBooks();
  clearAllFields();
});

function addToLibrary(book) {
  myLibrary.push(book);
}

function displayAllBooks() {
  const table = document.querySelector("table");
  table.innerHTML = `<tr><th>Title</th><th>Author</th><th>Pages</th><th>Finished</th><th>Delete?</th></tr>`;
  for (let book of myLibrary) {
    const row = document.createElement("tr");
    row.classList.add("row");
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td class="is-read">${book.isRead}</td><td><button class="delete">Delete</button></td>`;
    table.appendChild(row);
  }
}

function updateArray() {
  myLibrary = [];
  const table = document.querySelector("table");
  const tableRows = document.querySelectorAll(".row");
  for (let item of tableRows) {
    addToLibrary(
      new Book(
        item.children[0].innerHTML,
        item.children[1].innerHTML,
        item.children[2].innerHTML,
        item.children[3].innerHTML
      )
    );
  }
}

function clearAllFields() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = 0;
}

document.querySelector("table").addEventListener("click", function (e) {
  deleteFromLibrary(e.target);
  switchRead(e.target);
});

function deleteFromLibrary(el) {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.remove();

    updateArray();
    displayAllBooks();
  }
}

function switchRead(el) {
  if (el.classList.contains("is-read")) {
    if (el.innerHTML == "read") {
      el.innerHTML = "not read";
    } else if (el.innerHTML == "not read") {
      el.innerHTML = "read";
    }
    updateArray();
    displayAllBooks();
  }
}

// add 2 books manually though page numbers may not be accurate
addToLibrary(new Book("In Search of Lost Time", "Marcel Proust", 543, "read"));
addToLibrary(new Book("Ulysses", "James Joyce", 1354, "not read"));
displayAllBooks();

// MODAL
let modalBtn = document.querySelector(".modal-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

modalBtn.onclick = function () {
  modal.style.display = "block";
};
closeBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
