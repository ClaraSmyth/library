const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#book-name');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');

// Adds books to library
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  console.log(myLibrary)
});

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

// Prints the library to the page
function addBooksToPage() {
  const bookSection = document.querySelector('.main');
  const newDiv = document.createElement('div');
  newDiv.classList.add('card')
  bookSection.append(newDiv);
}

addBooksToPage()