const redisClient = require('../config/redis');

const otpVerify = async(req, res, otp, emailId) => {

    const userOriginalOtp = await redisClient.get(`emailOtp:${emailId}`);
    const currentOtp = otp;

    if (currentOtp !== Number(userOriginalOtp)) {
        return res.status(500).send({
            success: "failed",
            message: "Wrong otp"
        });
    }
}
module.exports = otpVerify;