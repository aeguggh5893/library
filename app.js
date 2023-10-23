"use strict"

const myLibrary= [];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBookToLibrary(title, author, pages, status) {
    
    const newBook = new Book(title, author, pages, status);

    myLibrary.push(newBook);

};


const entry = document.querySelector('.entry');

function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {

        let div = document.createElement('div');
        let deleteButton = document.createElement('button');
        let changeStatus = document.createElement('button');

        deleteButton.classList.add('delete');
        div.classList.add('card');
        changeStatus.classList.add('change');

        entry.appendChild(div);

        for (const property in myLibrary[i]) {
            let p = document.createElement('p');
            div.appendChild(p);
            p.innerText = `${myLibrary[i][property]}`;
        };

        div.appendChild(deleteButton);
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', deleteBook);

        div.appendChild(changeStatus);
        changeStatus.innerText = 'Change Status';
        changeStatus.addEventListener('click', changeReadStatus);
    };
};

const dialog = document.querySelector('dialog');
const addBook = document.querySelector('#add-book');
const close = document.querySelector('dialog button');

addBook.addEventListener('click', () => {
    dialog.showModal();
});

close.addEventListener('click', () => {
    console.log('canceled the modal');
    dialog.close();
});

const submit = document.querySelector('#submit');
const bookTitle = document.getElementById('title');
const authorName = document.getElementById('author');
const pageNumber = document.getElementById('pages');
const readStatus = document.getElementById('status');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close(bookTitle.value, authorName.value, pageNumber.value, readStatus.value);
    addBookToLibrary(bookTitle.value, authorName.value, pageNumber.value, readStatus.value);
    displayBook();
    let elements = document.querySelectorAll('.card');
    
    elements.forEach((element, index) => {
        element.setAttribute('data-index', index);
    });

});

function changeReadStatus() {
    let thing = entry.getElementsByTagName('p')[3];
    if(thing.innerText === 'Reading') {
        thing.innerText = 'Finished';
    } else {
        thing.innerText = 'Reading';
    };
};

function deleteBook(e) {
    let selected = e.target.parentElement;
    let indexValue = selected.getAttribute('data-index');
    
    myLibrary.splice(indexValue, 1);
    

    let removeDOM = entry.getElementsByTagName('div')[indexValue];
    
    
    entry.removeChild(removeDOM);
};
