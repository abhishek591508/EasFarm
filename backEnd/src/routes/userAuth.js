const express = require('express');
const Login = require('../controllers/Login');
const signUp = require('../controllers/signUp');
const validUser = require('../middlewares/validUser');
const logout = require('../controllers/logout')
const sendOtp = require('../controllers/otpSender');
const verifyOTP = require('../controllers/otpVerify');
const checkAuth = require('../controllers/checkAuth');
const user_auth = express.Router();

const users = [];

user_auth.get('/checkAuth',checkAuth)
user_auth.post('/login', Login);
user_auth.post('/sendotp', sendOtp);
user_auth.post('/signup', signUp);
// user_auth.post('/logout', validUser, logout);
user_auth.post('/logout', logout);
user_auth.post('/verifyotp',verifyOTP);

module.exports = user_auth;