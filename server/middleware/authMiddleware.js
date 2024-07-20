import jwt from "jsonwebtoken";

const authMiddleware=(req, res, next)=>{
    // const token=req.header('Authorization');
    const token=req.headers.authorization?.split(' ')[1];

    if(!token){
        console.log('No token found in headers');
        return res.status(401).json({message: 'No token, Authorization denied'});
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        req.user=decoded;
        next();
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).json({message: 'Token is not valid'});
    }
};

const admin=(req, res, next)=>{
    if(req.user && req.user.role==='hr'){
        next();
    }else{
        res.status(401).json({message: 'Not authorised as admin'});
    }
}

export {authMiddleware, admin};