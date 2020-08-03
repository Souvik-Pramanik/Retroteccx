import signinValidationSchema from "../ValidationSchemas/signinValidationSchema.js";
import bcrypt from 'bcryptjs';
import db from '../DB/db.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../JWT/token.js'

export default async (req, res) => {
    try {
        const valid = await signinValidationSchema.isValid(req.body)
        if (valid) {
            const admin = await db('admin_signin')
                .where({ 'email': req.body.email })
                .select('password', 'admin_id')
            if (admin.length > 0) {
                const match = await bcrypt.compare(req.body.password, admin[0].password);
                if (match) {
                    jwt.sign({ email: req.body.email },
                        JWT_SECRET,
                        { expiresIn: '3h' },
                        (err, token) => {
                            if (err) {
                                console.log(err);
                                res.json("err")
                            }
                            else
                                res.status(200).json({
                                    admin_id: admin[0].admin_id,
                                    status: "success",
                                    token: token,
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