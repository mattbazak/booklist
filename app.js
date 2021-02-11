// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');
  //insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);

}
//show alert

UI.prototype.showAlert = function(msg, className) {
  // create div
  const div = document.createElement('div');
  // add class
  div.className = `alert ${className}`;
  //add text message+
  div.appendChild(document.createTextNode(msg));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);

  //timeout after 3s
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
} 


// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // get for values
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value

  // instantiate book
  const book = new Book(title, author, isbn);
  

  // Instantiate UK
  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');

  } else {

    // add book to list
    ui.addBookToList(book);
    ui.showAlert('Book has been added to list', 'succes');

    // clear fields
    ui.clearFields();
  }
  
  e.preventDefault();
});


// event listener for delete (parent)
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  
  ui.deleteBook(e.target);
  
  ui.showAlert('Book has been removed', 'error');

  e.preventDefault();
});