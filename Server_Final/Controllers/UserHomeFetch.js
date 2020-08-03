import db from '../DB/db.js';

export default async (req, res)=>{
    try {
        const solved = await db.raw(`SELECT s.status_id, s.user_rating, s.user_feedback, r.gov_admin, r.report_id
                                    FROM status AS s
                                    LEFT JOIN
                                    reports AS r
                                    ON r.report_id = s.report_id
                                    WHERE status = 'Closed' AND user_rating is not null`);
        res.status(200).json({
            row: solved.rows
        })  
    } catch (error) {
        console.log(error)
    }                            
}