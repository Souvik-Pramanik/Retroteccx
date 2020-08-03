import db from '../DB/db.js';

export default  (req, res)=>{
    db('status')
        .where('report_id', '=', req.body.id)
        .update({
            user_rating: req.body.rate,
            user_feedback: req.body.feedback
        })
        .then(()=>res.json('success'))
        .catch(console.log)
}