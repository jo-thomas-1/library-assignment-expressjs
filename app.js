const express = require('express');
const values = require(__dirname + '/values.js');

const app = new express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.static(__dirname + '/public'));

// router for account related pages
const account_router = require(__dirname + '/src/routes/account_router.js')();
app.use('/account', account_router);

// router for book related pages
const book_router = require(__dirname + '/src/routes/book_router.js')();
app.use('/book', book_router);

// index page
app.get('/', function(request, response) {
    response.render("index", {
        title: values.title,
        nav: values.nav,
        quote: values.quote_list[Math.floor(Math.random() * values.quote_list.length)],
        book_count: Object.keys(values.book_list).length,
        current_user: values.current_user,
        user_count: Object.keys(values.user_list).length
    });
});

// contact us page
app.get('/contact', function(request, response) {
    response.render("contact", {
        title: values.title,
        nav: values.nav,
        current_user: values.current_user
    });
});

// check server status
app.get('/status', function(request, response) {
    response.send("Server is connected and application is live");
});

// 404 Error - Page not found
app.get('/*', function(request, response) {
    response.render("error", {
        title: 'Library - 404',
        nav: values.nav,
        current_user: values.current_user,
        error_code: '404',
        error: 'Page not found',
        description: 'The requested page was not found. Please try again.'
    });
});

// set listner and port
const port = 8888;
app.listen(port);
console.log("Library app is running in port " + port);