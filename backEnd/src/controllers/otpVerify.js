const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/farmerSchema');
const redisClient = require('../config/redis');

const otpVerify = async (req, res) => {
  try {
    const { emailId, otp } = req.body;

    if (!emailId || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    // get original otp from redis
    const userOriginalOtp = await redisClient.get(`emailOtp:${emailId}`);

    if (!userOriginalOtp) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    // compare OTPs (convert both to string for safe comparison)
    if (String(otp) !== String(userOriginalOtp)) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP"
      });
    }

    // find farmer
    const frmer = await Farmer.findOne({ emailId });
    if (!frmer) {
      return res.status(401).json({
        success: false,
        message: 'Farmer has not registered'
      });
    }

    // payload for JWT
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      _id: frmer._id,
      role: frmer.role,
      emailId: frmer.emailId,
      mobileNumber: frmer.mobileNumber || null
    };

    // create JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // set token in cookie
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 1000 // 1 hour
    // });
    res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 1000 // 1 hour
    });

    // delete OTP from redis after success
    await redisClient.del(`emailOtp:${emailId}`);

    return res.status(200).json({
      success: "success",
      message: "Login Successfully"
      // token: token  <-- if you want to return it in response as well
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during OTP verification"
    });
  }
};

module.exports = otpVerify;
