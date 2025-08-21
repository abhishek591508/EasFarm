
const {service_provider} = require('../models/machinerySchrms');

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.warn('No token found in cookies');
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const isBlacklisted = await redisClient.exists(`blacklist:${token}`);
        if (isBlacklisted === 1) {
            console.warn('Token is blacklisted');
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        console.log('🔐 Verifying JWT...');
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.farmer = payload;

        const { _id } = payload;
        console.log(`👤 Verifying user with ID: ${_id}`);

        const existThisUser = await service_provider.findById(_id);
        if (!existThisUser) {
            console.warn('Survice Provider not found in database');
            return res.status(401).json({ success: false, message: 'Unauthorized Provider' });
        }

        console.log('✅ Authenticated successfully');
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;