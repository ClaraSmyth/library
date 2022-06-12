const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#book-name');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');
const bookSection = document.querySelector('.main');

// Prints all the books in the Library to the page
function printBooks() {
  bookSection.textContent = '';
  myLibrary.forEach((book, index) => {
    createBookCard(book, index);
    console.log(book, index)
  });
  removeBook();
}

// Adds books to library
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  console.log(myLibrary)
});

// Remove books from Library
function removeBook() {
  const removeBtns = document.querySelectorAll('.card-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      myLibrary.splice(btn.getAttribute('data'), 1);
      printBooks();
    })
  })
}

// Library array of books
let myLibrary = [
  { 
    title: 'The Hobbit',
    author: 'J.R.R. Tolkein',
    pages: '500',
    read: true
  },
  { 
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: '600',
    read: false
  },
];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Creates the Book elements for the page
function createBookCard(book, index) {
  // Creates the card div
  const newCardDiv = document.createElement('div');
  newCardDiv.classList.add('card')

  //Adds a title to the div
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title');
  cardTitle.innerText = book.title;
  newCardDiv.append(cardTitle);

  // Adds the author name to the div
  const cardAuthor = document.createElement('p');
  cardAuthor.classList.add('card-author');
  cardAuthor.innerText = book.author;
  newCardDiv.append(cardAuthor);

  // Adds the pages to the div
  const cardPages = document.createElement('p');
  cardPages.classList.add('card-pages');
  cardPages.innerText = book.pages + ' Pages';
  newCardDiv.append(cardPages);

  // Adds the read checkbox to the div
  const cardCheckbox = document.createElement('input');
  cardCheckbox.setAttribute('type', 'checkbox');
  cardCheckbox.setAttribute('id', 'checkbox');
  cardCheckbox.setAttribute('name', 'checkbox');
  cardCheckbox.classList.add('card-checkbox');
  newCardDiv.append(cardCheckbox);

  // Adds the read checkbox label to the div
  const cardCheckboxLabel = document.createElement('label');
  cardCheckboxLabel.setAttribute('for', 'checkbox');
  cardCheckboxLabel.classList.add('card-checkbox-label');
  cardCheckboxLabel.innerText = 'Read?';
  newCardDiv.append(cardCheckboxLabel);

  // Adds a remove button to the div
  const cardBtn = document.createElement('button');
  cardBtn.setAttribute('data', index);
  cardBtn.classList.add('card-btn');
  cardBtn.innerText = 'Remove';
  newCardDiv.append(cardBtn);

  //Adds the new book to the page
  bookSection.append(newCardDiv);
}

printBooks();
// console.log(myLibrary[1])