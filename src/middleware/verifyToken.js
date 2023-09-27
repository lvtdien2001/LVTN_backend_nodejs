import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    // check public router
    const routesReg = /\/brand|\/product/;
    const isPublicRoutes =
        /\/auth\/login|\/auth\/register|\/auth\/check-account|\/auth\/forgot-password/.test(req.originalUrl) ||
        /\/otp/.test(req.originalUrl) ||
        (routesReg.test(req.originalUrl) && req.method === 'GET');

    if (isPublicRoutes) {
        return next();
    }

    // Token not found
    if (!token) {
        return res.status(400).json({
            success: false,
            msg: 'Access token not found'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
        req.user = {
            id: decoded.userId,
            isAdmin: decoded.isAdmin
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Invalid token'
        })
    }
}

export default verifyToken
