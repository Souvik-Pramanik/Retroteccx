import path from '../path.js';
export default async (req, res) => {
    console.log(req.body.files)
    const file = req.body.files.map((value)=>{
        return {
            path: (process.env.PWD || path)+value,
            name: value.slice(value.lastIndexOf("\\"), value.length)
        }
    })
    console.log(file)
    // const file = "P:\\Node\\DBS_server\\" + req.body.files[0];
    // console.log(file)
    await res.zip({files: file});
}