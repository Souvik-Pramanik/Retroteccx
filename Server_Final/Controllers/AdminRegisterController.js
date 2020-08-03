import adminRegistrationValidationSchema from "../ValidationSchemas/adminRegistrationValidationSchema.js";
import bcrypt from 'bcryptjs';
import db from '../DB/db.js';

export default (req, res) => {
    const { email, name, aadhar, mobile, department, city, present_address, permanent_address } = req.body;
    try {
        adminRegistrationValidationSchema
            .isValid(req.body)
            .then(valid => {
                if (valid) {
                    db.transaction(trx => {
                        db('admin').insert({
                            name: name,
                            email: email,
                            admin_aadhar: Number(aadhar),
                            department: department,
                            admin_city: city,
                            admin_contact: Number(mobile),
                            permanent_address: permanent_address,
                            present_address:present_address,
                        }, ['email', 'admin_id'])
                            .transacting(trx)
                            .then(async login => {
                                const hash = await bcrypt.hash(req.body.password, 10);
                                return db('admin_signin').insert({
                                    admin_id: login[0].admin_id,
                                    email: login[0].email,
                                    password: hash
                                })
                                    .transacting(trx);
                            })
                            .then(trx.commit)
                            .catch(trx.rollback);
                    })
                        .then(() => {
                            res.status(200).json('success')
                        })
                        .catch(function (error) {
                            res.status(500).json('failed')
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