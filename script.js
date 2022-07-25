const bookForm = document.querySelector('#book-form');
const title = document.querySelector('#book-form-name');
const author = document.querySelector('#book-form-author');
const pages = document.querySelector('#book-form-pages');
const read = document.querySelector('#book-form-read');
const bookSection = document.querySelector('.main');
const openFormBtn = document.querySelector('.header-btn');
const closeFormBtn = document.querySelector('.book-form-close');
const formModal = document.querySelector('.form-modal');

// Opens form modal
openFormBtn.addEventListener('click', () => {
    formModal.classList.add('active');
});

// Closes form modal
closeFormBtn.addEventListener('click', (e) => {
    formModal.classList.remove('active');
});

// Library array of books
const LOCAL_STORAGE_BOOK_KEY = 'library.books';
const myLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOOK_KEY)) || [
    {
        title: 'The Hobbit, or There and Back Again',
        author: 'J.R.R. Tolkien',
        pages: 310,
        read: true,
    },
    {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        pages: 374,
        read: false,
    },
    {
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J.K. Rowling',
        pages: 870,
        read: true,
    },
];

const saveTodos = () => {
    localStorage.setItem(LOCAL_STORAGE_BOOK_KEY, JSON.stringify(myLibrary));
};

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Updates the book within array
Book.prototype.updateBook = function (index, value) {
    myLibrary[index].read = value;
};

// Adds books to library
bookForm.addEventListener('submit', (e) => {
    formModal.classList.remove('active');
    e.preventDefault();
    const book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    clearInputs();
    printBooks();
});

// Remove books from Library
function removeBook() {
    const removeBtns = document.querySelectorAll('.card-btn');
    removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            myLibrary.splice(btn.getAttribute('data'), 1);
            printBooks();
        });
    });
}

// Function to update the books read status
function UpdateRead() {
    const bookCheckbox = document.querySelectorAll('.card-checkbox');
    bookCheckbox.forEach((checkbox) => {
        checkbox.addEventListener('click', (update) => {
            const bookIndex = checkbox.getAttribute('data');
            const readValue = checkbox.checked;
            update = Object.create(Book.prototype);
            update.updateBook(bookIndex, readValue);
            saveTodos();
        });
    });
}

// Prints all the books in the Library to the page
function printBooks() {
    bookSection.textContent = '';
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    });
    removeBook();
    UpdateRead();
    saveTodos();
}

// Clears the form inputs
function clearInputs() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

// Creates the Book elements for the page
function createBookCard(book, index) {
    // Creates the card div
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add('card');

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
    cardPages.innerText = book.pages;
    // Adds icon to the pages div
    const cardPagesIcon = document.createElement('img');
    cardPagesIcon.setAttribute('src', './icons/book-open-page-variant.svg');
    cardPagesIcon.classList.add('card-pages-svg');
    cardPages.append(cardPagesIcon);
    newCardDiv.append(cardPages);

    // Adds the read checkbox to the div
    const cardCheckbox = document.createElement('input');
    cardCheckbox.setAttribute('data', index);
    cardCheckbox.setAttribute('type', 'checkbox');
    cardCheckbox.setAttribute('id', `checkbox${index}`);
    cardCheckbox.setAttribute('name', `checkbox${index}`);
    cardCheckbox.classList.add('card-checkbox');
    cardCheckbox.checked = book.read;
    newCardDiv.append(cardCheckbox);

    // Adds the read checkbox label
    const cardCheckboxLabel = document.createElement('label');
    cardCheckboxLabel.setAttribute('for', `checkbox${index}`);
    cardCheckboxLabel.classList.add('card-checkbox-label');
    // Adds the icon to the checkbox label div
    const cardCheckboxLabelIcon = document.createElement('img');
    cardCheckboxLabelIcon.setAttribute('src', './icons/eye.svg');
    cardCheckboxLabelIcon.classList.add('card-checkbox-label-svg');
    cardCheckboxLabel.append(cardCheckboxLabelIcon);
    newCardDiv.append(cardCheckboxLabel);

    // Adds a remove button to the div
    const cardBtn = document.createElement('button');
    cardBtn.setAttribute('data', index);
    cardBtn.classList.add('card-btn');
    //Adds icon to the remove button
    const cardBtnIcon = document.createElement('img');
    cardBtnIcon.setAttribute('src', './icons/delete.svg');
    cardBtnIcon.classList.add('card-btn-svg');
    cardBtn.append(cardBtnIcon);
    newCardDiv.append(cardBtn);

    //Adds the new book to book section of the page
    bookSection.append(newCardDiv);
}

printBooks();
