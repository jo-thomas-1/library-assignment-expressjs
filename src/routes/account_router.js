const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');
const values = require('../../values.js');

const account_router = express.Router();

account_router.use(body_parser.urlencoded({ extended: true }));

function router()
{
    // account info
    account_router.get('/', function(request, response) {
        if(values.current_user == 0) response.redirect('/account/login');
        else
        {
            console.log("Current user :: " + values.current_user);
            response.render("account", {
                title: values.title,
                nav: values.nav,
                current_user: values.current_user
            });
        }
    });

    // login page
    account_router.get('/login', function(request, response) {
        if(values.current_user != 0) response.redirect('/account');
        response.render("login", {
            title: values.title,
            nav: values.nav,
            current_user: values.current_user
        });
    });

    // account login
    account_router.post('/login', function(request, response) {
        console.log('credentials are being validated');

        if(values.user_list[request.body.username])
        {
            console.log("User found");
            if(request.body.password == values.user_list[request.body.username]['password'])
            {
                values.current_user = values.user_list[request.body.username];
                response.redirect('/');
            }
            else
            {
                console.log('invalid password');
                response.render("login", {
                    title: values.title,
                    nav: values.nav
                });
            }
        }
        else
        {
            console.log("Invalid user");
            response.render("login", {
                title: values.title,
                nav: values.nav
            });
        }
    });

    // logout process
    account_router.get('/logout', function(request, response) {
        values.current_user = 0;
        response.redirect('/');
    });

    // new user register page
    account_router.get('/register', function(request, response) {
        if(values.current_user != 0) response.redirect('/account');
        response.render("register", {
            title: values.title,
            nav: values.nav,
            current_user: values.current_user,
            message: ""
        });
    });

    // new user form data
    account_router.post('/register', function(request, response) {
        console.log('new user data is being recorded');

        if(values.user_list[request.body.username])
        {
            console.log('username already exists');
            response.render("register", {
                title: values.title,
                nav: values.nav,
                current_user: values.current_user,
                message: "username already exists"
            });
        }
        else
        {
            values.user_list[request.body.username] = {
                "name": request.body.full_name,
                "nickname": request.body.nickname,
                "password": request.body.password,
                "email": request.body.email
            };

            data = JSON.stringify(values.user_list, null, 4);
            fs.writeFileSync('./public/data/users.json', data, 'utf8');

            console.log("new user updated to file");

            response.redirect('/account/login');
        }
    });

    return account_router;
}

module.exports = router;