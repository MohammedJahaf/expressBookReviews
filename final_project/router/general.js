const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return new Promise((resolve, reject) => {
    resolve({ books });
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json({ message: "Failed to retrieve books" });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    return new Promise((resolve, reject) => {
        const book = Object.values(books).find((bo) => bo.isbn === isbn);
        if (book) {
          resolve(book);
        } else {
          reject({ message: "Book not found" });
        }
      })
        .then((book) => {
          return res.status(200).json(book);
        })
        .catch((error) => {
          return res.status(404).json({ message: "Book not found" });
        });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  return new Promise((resolve, reject) => {
    const fBooks = Object.values(books).filter(
      (bo) => bo.author === author
    );
    if (fBooks.length > 0) {
      resolve(fBooks);
    } else {
      reject({ message: "Book not found" });
    }
  })
    .then((fBooks) => {
      return res.status(200).json({ fBooks });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Book not found" });
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  return new Promise((resolve, reject) => {
    const fBooks = Object.values(books).filter(
      (bo) => bo.title === title
    );
    if (fBooks.length > 0) {
      resolve(filtredTitle);
    } else {
      reject({ message: "Book not found" });
    }
  })
    .then((fBooks) => {
      return res.status(200).json({ fBooks });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Book not found" });
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(book){
    return res.send(book['reviews'])
  }
  return res.status(400).json({message: "No Data Found"});
});

module.exports.general = public_users;
