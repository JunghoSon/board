import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status().json({
            message: 'not logged in'
        });
    }
    
    const p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-token-secret'), (error, decoded) => {
            if(error) reject(error);
            resolve(decoded);
        });
    });
    
    const respond = (decoded) => {
        req.decoded = decoded;
        next();
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }

    p.then(respond)
     .catch(onError);
};

export default authMiddleware;