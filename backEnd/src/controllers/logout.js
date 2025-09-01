const redisClient = require("../config/redis");

const Logout = async(req, res) => {


    const exp = req.farmer.exp;
    const ttl = exp - Math.floor(Date.now() / 1000);

    await redisClient.set(`blacklist:${req.cookies.token}`, "truee", { EX: ttl });

    res.clearCookie("token");
    res.status(200).send({
        success:true,
        message:"Logout successful"
    });
}

module.exports = Logout;