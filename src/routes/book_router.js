const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');
const values = require('../../values.js');

const book_router = express.Router();

book_router.use(body_parser.urlencoded({ extended: true }));

function router()
{
    // all books
    book_router.get('/', function(request, response) {
        if(values.current_user === 0) response.redirect('/account');
        response.render("books", {
            title: values.title,
            nav: values.nav,
            book_list: values.book_list,
            current_user: values.current_user
        });
    });

    // add new book
    book_router.get('/new', function(request, response) {
        if(values.current_user === 0) response.redirect('/account');
        response.render("new_book", {
            title: values.title,
            nav: values.nav,
            book_list: values.book_list,
            current_user: values.current_user
        });
    });

    // add new book form data
    book_router.post('/new', function(request, response) {
        console.log('data is being recorded');

        let ean = request.body.EAN;
        if(ean == '') ean = Date.now();

        values.book_list[ean] = {
            "ISBN": request.body.ISBN,
            "title": request.body.book_title,
            "author": request.body.author,
            "publisher": request.body.publisher,
            "abstract": request.body.abstract,
            "added_by": current_user['nickname'],
            "genre": []
        };

        data = JSON.stringify(values.book_list, null, 4);
        fs.writeFileSync('./public/data/books.json', data, 'utf8');

        console.log("new book updated to file");

        response.redirect('/book/new');
    });

    // all books grid
    book_router.get('/grid', function(request, response) {
        if(values.current_user === 0) response.redirect('/account');
        response.render("books_grid", {
            title: values.title,
            nav: values.nav,
            book_list: values.book_list,
            current_user: values.current_user
        });
    });

    // single book
    book_router.get('/info/:ean', function(request, response) {
        if(values.current_user === 0) response.redirect('/account');
        response.render("book", {
            title: values.title,
            nav: values.nav,
            book_list: values.book_list,
            book: request.params.ean,
            current_user: values.current_user
        });
    });

    return book_router;
}

module.exports = router;