const myLibrary = [];

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

  addToLibrary(new Book(title, author, pages, isRead));

  displayAllBooks();
});

function addToLibrary(book) {
  myLibrary.push(book);
}

function displayAllBooks() {
  const list = document.querySelector("table");
  list.innerHTML = `<tr><th>Title</th><th>Author</th><th>Pages</th><th>Finished</th><th>Delete?</th></tr>`;
  for (let book of myLibrary) {
    const row = document.createElement("tr");
    row.innerHTML = 
    `<td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.isRead}</td><td><button class="delete">Delete</button></td>`;
    list.appendChild(row);
  }
}

function deleteFromLibrary(/* ??? */) {

  // given some unique identifier, we could delete
  //  a particular book from the myLibrary.
  displayAllBooks();
}
