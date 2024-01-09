import multer from 'multer';
import { jsonToVtt } from '../helpers/utils.js';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const currDate = Date.now();
        console.log(file)
        req.name = currDate + '-' + file.originalname;
        console.log(currDate);
        cb(null, req.name)
    },
})

export const upload = multer({storage:storage});

export const uploadVtt = (req,res,next) => {
    console.log(req.body.subData,req.name)
    const {subData} = req.body;
    if(subData?.length === 0 || !req.name) return res.status(500).json({msg:"Please Provide Subtitles"});
    fs.writeFileSync(`./uploads/${req.name.split(".")[0]}.json`, subData, function (err) {
        if (err) return res.status(500).json(err);
    });
    next();
} 
