import jwt from 'jsonwebtoken';

export const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.cookies.token;
    console.log(authorization);
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    const token = authorization;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 300 });
};
