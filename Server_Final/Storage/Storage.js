import multer from 'multer';

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.split("/")[0] == 'image')
            cb(null, 'Uploads/Images/')
        else if (file.mimetype.split("/")[0] == 'text')
            cb(null, 'Uploads/Texts/')
        else if (file.mimetype.split("/")[0] == 'audio')
            cb(null, 'Uploads/Audios/')
        else if (file.mimetype.split("/")[0] == 'video')
            cb(null, 'Uploads/Videos/')
        else if (file.mimetype.split("/")[0] == 'application')
            cb(null, 'Uploads/Applications/')
        else
            cb(null, 'Uploads/Others/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + req.verified.email + "_" + file.originalname.replace(" ", "_"))
    }
})
export default Storage