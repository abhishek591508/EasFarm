const express = require('express');
const Login = require('../controllers/Login');
const signUp = require('../controllers/signUp');
const validUser = require('../middlewares/validUser');
const logout = require('../controllers/logout')

const user_auth = express.Router();

const users = [];


user_auth.post('/login', Login);
user_auth.post('/signup', signUp);
user_auth.post('/logout', validUser, logout);

module.exports = user_auth;