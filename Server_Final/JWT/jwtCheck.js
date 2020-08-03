import jwt from 'jsonwebtoken';
import {JWT_SECRET} from './token.js'

export default async (req, res, next)=>{
    
    try {
        // if (req.path == '/submitreport' || req.path == '/userfetch') {
        //     const token = req.headers.authorization;
        //     const verified = jwt.verify(token.split(' ')[1], JWT_SECRET)
        //     const user = await db('signin')
        //         .where({ 'user_email': verified.email })
        //         .select('user_email')
        //     if (user.length == 0) {
        //         res.json('failed')
        //         return;
        //     }
        //     else {
        //         req.verified = verified;
        //         next();
        //     }
        // } 
        // else if (req.path == '/adminfetch' || req.path == '/adminfeedback') {
        //     const token = req.headers.authorization;
        //     const verified = jwt.verify(token.split(' ')[1], JWT_SECRET)
        //     const user = await db('admin_signin')
        //         .where({ 'email': verified.email })
        //         .select('email')
        //     if (user.length == 0) {
        //         res.status(400).json('failed')
        //         return;
        //     }
        //     else {
        //         req.verified = verified;
        //         next();
        //     }
        // }
        // else{

        // }
        const token = req.headers.authorization;
        req.verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
        next();
        
    } catch (error) {
        console.log(error)
        res.status(500).json('failed');
        return;
    }
            
}