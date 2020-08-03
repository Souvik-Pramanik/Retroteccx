import db from '../DB/db.js';

export default async (req, res) => {
    try {
        var reportInfo = await db.raw(`SELECT r.gov_admin, r.report_id, r.area_of_gov_admin, r.report_submit_on, r.report_details, s.status, s.status_feedback, s.created_at, a.name\
                                    FROM reports AS r\
                                    FULL JOIN\
                                    status AS s\
                                    ON r.report_id = s.report_id\
                                    FULL JOIN\
                                    users AS u\
                                    ON r.user_email = u.user_email\
                                    LEFT JOIN\
                                    admin AS a\
                                    ON a.admin_id = s.admin_id
                                    WHERE r.user_email = '${req.verified.email}'`)
        
        res.status(200).json({
            row: reportInfo.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json();
    }
}