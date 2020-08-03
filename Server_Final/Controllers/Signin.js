import signinValidationSchema from "../ValidationSchemas/signinValidationSchema.js";
import bcrypt from 'bcryptjs';
import db from '../DB/db.js';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../JWT/token.js'

export default async (req, res) => {
    try {
        const valid = await signinValidationSchema.isValid(req.body)
            if (valid) {
                const user = await db('signin')
                    .where({ 'user_email': req.body.email })
                    .select('user_password')
                if (user.length > 0) {
                    const match = await bcrypt.compare(req.body.password, user[0].user_password);
                    if (match) {
                        const userInfo = await db('users')
                            .where('user_email', req.body.email)
                            .select('user_name')
                        jwt.sign({ email: req.body.email },
                            JWT_SECRET,
                            { expiresIn: '1h' },
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                    res.json("err")
                                }
                                else
                                    res.json({
                                        status: "success",
                                        token: token,
                                        username: userInfo[0].user_name
                                    })
                            })
                    }
                    else {
                        res.json('wrong cred')
                    }
                }
                else {
                    res.json('failed')
                }
            }
            else {
                res.json("validation error")
            }
    } catch (error) {
        res.json("error")
        console.log(error)
    }
} 