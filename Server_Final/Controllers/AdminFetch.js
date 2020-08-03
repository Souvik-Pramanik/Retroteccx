import db from '../DB/db.js';

export default async (req, res) => {
    var reportInfo = await db.raw( "SELECT r.*, s.status_id, s.status, s.status_feedback, a.admin_id, u.user_id, u.user_name, u.user_email, u.user_contact, s.created_at, a.name, r.files, r.report_city\
                                    FROM reports AS r\
                                    FULL JOIN\
                                    status AS s\
                                    ON r.report_id = s.report_id\
                                    LEFT JOIN\
                                    users AS u\
                                    ON r.user_email = u.user_email\
                                    LEFT JOIN\
                                    admin AS a\
                                    ON a.admin_id = s.admin_id" )
    res.status(200).json({
        rows: reportInfo.rows
    })
}