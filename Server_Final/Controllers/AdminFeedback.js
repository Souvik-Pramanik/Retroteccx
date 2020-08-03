import db from '../DB/db.js';

export default async (req, res) => {
    console.log(req.body)
    try {
        const status = await db('status')
            .where({ 'report_id': req.body.report_id })
            .select('status_id')
        if (status.length == 0) {
            db('status')
                .insert(req.body)
                .then(res.status(200).json())
                .catch(res.status(500).json())
        } else {
            // console.log(status)
            db('status')
                .where('status_id', '=', status[0].status_id)
                .update({
                    status: req.body.status,
                    status_feedback: req.body.status_feedback,
                    admin_id: req.body.admin_id,
                    created_at: new Date()
                }, ['status', 'status_feedback'])
                .then((data) => res.status(200).json({
                    status: data[0].status,
                    status_feedback: data[0].status_feedback
                }))
                .catch(() => res.status(500).json('failed'))
        }
    } catch (error) {
        console.log(error)
    }
}
// status: req.body.status,
//     status_feedback: req.body.status_feedback,
//         user_id: req.body.user_id,
//             report_id: city,
//                 admin_id: report,