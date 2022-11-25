// Get Form
let bookForm = document.querySelector('#bookForm');
let bookBody = document.querySelector('#BookBody');


// Oop Class Define
class book{
    constructor(title,author,isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

class uiData{
    
    static uidata(book){
        let bookBody = document.querySelector('#BookBody');
        let tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#">X</a></td>
        `;

        bookBody.appendChild(tableRow);
    }

    static clearFilds(){
        document.querySelector('#title').value = '',
        document.querySelector('#author').value = '',
        document.querySelector('#isbn').value = '';
    }

    static showAlert(massage,className){
        let div = document.createElement('div');
            div.className = `alert ${className}`;
            div.appendChild(document.createTextNode(massage));
        let container = document.querySelector('.container');
        let form = document.querySelector('#bookForm');
            container.insertBefore(div, form);

    setInterval(() => {
        document.querySelector('.alert').remove()
    }, 4000);

    }

    static removebook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            uiData.showAlert('Book Deleted', 'error');
        }
    }

}

class store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addsbook(book){
        let books = store.getBook();
            books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static fromLocalStore(){
        let books = store.getBook();
        books.forEach(addbook => {
            uiData.uidata(addbook);
        });
    }

    // Remove From LocalStorage

    static removeBook(isbn){
        let books = store.getBook();

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
  
}

// Add EventListener
bookForm.addEventListener('submit', addBook);
bookBody.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', store.fromLocalStore());


// addBook Function Define
function addBook(e){
    e.preventDefault();
    
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    
    let bookData = new book(title,author,isbn);
 
    if(title === '' || author === '' || isbn === ''){
        uiData.showAlert('please Fill The All Feilds', 'error');
    }else{
        uiData.uidata(bookData);
        uiData.clearFilds();
        uiData.showAlert('BookAdded Successfully', 'success');

        store.addsbook(bookData);
    }

}

function removeBook(e){
    e.preventDefault();
    uiData.removebook(e.target);
}

