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

function testing() {
  let form = document.querySelector("form");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none"
  }
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#read").checked;

  addToLibrary(new Book(title, author, pages, isRead));

  displayAllBooks();
  clearAllFields();
});

function addToLibrary(book) {
  myLibrary.push(book);
}

function displayAllBooks() {
  const list = document.querySelector("table");
  list.innerHTML = `<tr><th>Title</th><th>Author</th><th>Pages</th><th>Finished</th><th>Delete?</th></tr>`;
  for (let book of myLibrary) {
    const row = document.createElement("tr");
    row.classList.add("row");
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.isRead}</td><td><button class="delete">Delete</button></td>`;
    list.appendChild(row);
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
});

function deleteFromLibrary(el) {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.remove();
    myLibrary = [];

    const table = document.querySelector("table");
    const tableRows = document.querySelectorAll(".row");
    for (let item of tableRows) {
      addToLibrary(
        new Book(
          item.children[0].innerText,
          item.children[1].innerText,
          item.children[2].innerText,
          item.children[3].innerText
        )
      );
    }
    displayAllBooks();
  }
}
