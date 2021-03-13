const express = require('express');
const fs = require('fs');

const quotes = JSON.parse(fs.readFileSync('public/data/quotes.json'));
const users = JSON.parse(fs.readFileSync('public/data/users.json'));
const nav = JSON.parse(fs.readFileSync('public/data/nav.json'));
const books = JSON.parse(fs.readFileSync('public/data/books.json'));


// ---------- exporting values from module ----------

module.exports.title = 'Library';
module.exports.nav = nav;
module.exports.quote_list = quotes;
module.exports.user_list = users;
module.exports.current_user = 0;
module.exports.book_list = books;