const jwt = require("jsonwebtoken");

const checkAuth = async (req, res) => {
  const token = req.cookies.token;

  // If no token found
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      id: decoded._id,
      emailId: decoded.emailId,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = checkAuth;
