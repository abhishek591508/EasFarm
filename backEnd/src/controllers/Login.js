const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/farmerSchema')
const toVerifyOtp = require('../controllers/otpVerify');
const redisClient = require('../config/redis');


const Login = async(req, res) => {
    try {
        const { mobileNumber, password, otp } = req.body;

        if (!mobileNumber || !password || !otp) {
            return res.status(400).send({ success: false, message: "Invalid Credentials" });
        }

        const frmer = await Farmer.findOne({ mobileNumber });

        if (!frmer) {
            return res.status(401).send({ success: false, message: 'Farmer has not registered' });
        }
        req.frmer = frmer;


        await toVerifyOtp(req, res, otp, frmer.emailId);


        const matchPassword = await bcrypt.compare(password, frmer.password);
        if (!matchPassword) {
            return res.status(401).send({ success: false, message: 'Invalid Credential' });
        }

        const secretKey = process.env.JWT_SECRET;
        const payload = {
            _id: frmer._id,
            role: frmer.role,
            emailId: frmer.emailId,
            mobileNumber: mobileNumber,
            iat: Math.floor(Date.now() / 1000) // issued at
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        req.frmer = frmer;
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000 });

        // after successful login delete otp
        await redisClient.del(`emailOtp:${ req.frmer.emailId }`);

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Error in Login: " + err.message
        });
    }
};

module.exports = Login;