const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#book-name');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.checked);
  console.log(book)
});

let myLibrary = [
  { 
    name: 'The Hobbit',
    author: 'J.R.R. Tolkein',
    pages: '500',
    read: true
  },
  { 
    name: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: '600',
    read: false
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// console.log(myLibrary[1])
// console.log(bookForm)