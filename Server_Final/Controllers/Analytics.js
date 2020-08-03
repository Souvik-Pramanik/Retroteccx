import db from '../DB/db.js';

export default async (req, res)=>{
   var data = await db.select().table('analytics');
   const totals = [];
   var totalsWIthLabel = {};
   var lables = [];
   for (const key in data[0]) {
       data[0][key]=data[0][key].map((value)=>Number(value));
       const t = data[0][key].reduce((total, num) => total + num);
       totals.push(t);
        lables.push(key);
       totalsWIthLabel[key] = t;
    }
    lables.sort(function(a,b) {
        return totalsWIthLabel[b]-totalsWIthLabel[a];
    })
    // labels = lables.map((value)=>value.replace(/_/g, "-"));
   res.json({
       totals: totals.sort((a,b)=>b-a),
       labels: lables,
       categorical: data[0]
   })
}