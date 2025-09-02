const redisClient = require("../config/redis");
const jwt = require('jsonwebtoken');

const Logout = async(req, res) => {


    // const exp = req.farmer.exp;
    // const ttl = exp - Math.floor(Date.now() / 1000);

    // await redisClient.set(`blacklist:${req.cookies.token}`, "truee", { EX: ttl });
    try{
            if (req.cookies.token) {
                const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                const ttl = decoded.exp - Math.floor(Date.now() / 1000);
                await redisClient.set(`blacklist:${req.cookies.token}`, "true", { EX: ttl });
            }

            // res.clearCookie("token");
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.status(200).send({
                success:true,
                message:"Logout successful"
            });
    }
    catch(err){
            console.error("Logout Error:", err);
    }    
}

module.exports = Logout;