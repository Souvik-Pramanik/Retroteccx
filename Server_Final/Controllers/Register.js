import registrationValidationSchema from "../ValidationSchemas/registrationValidationSchema.js";
import bcrypt from 'bcryptjs';
import db from '../DB/db.js';

export default (req, res) => {
    console.log(req.body)
    const { email, username, aadhar, mobile } = req.body;
    try {
        registrationValidationSchema
            .isValid(req.body)
            .then(valid => {
                if (valid) {
                    db.transaction(trx => {
                        db('users').insert({
                            user_name: username,
                            user_email: email,
                            user_aadhar: Number(aadhar),
                            user_contact: Number(mobile)
                        }, 'user_email')
                            .transacting(trx)
                            .then(async login_email => {
                                const hash = await bcrypt.hash(req.body.password, 10);
                                return db('signin').insert({
                                    user_email: login_email[0],
                                    user_password: hash
                                })
                                    .transacting(trx);
                            })
                            .then(trx.commit)
                            .catch(trx.rollback);
                    })
                        .then(() => {
                            res.json('success')
                        })
                        .catch(function (error) {
                            res.json('failed')
                            console.error(error);
                        });
                }
                else {
                    res.json("validation error")
                }
            });

    } catch (error) {
        console.log(error.messege)
    }

}