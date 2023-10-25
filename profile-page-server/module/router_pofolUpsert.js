const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

const dateFormatting = require("./modules").dateFormatting;
const db = require("./modules").db;

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "static/img/"),
    filename: (req, file, cb) => cb(null, dateFormatting(new Date(), "file")+file.originalname)
})

const imgUpload = multer({storage : storage});



router.post("/", imgUpload.single("file"), (req, res)=>{
    let pofol = JSON.parse(req.body.pofol);
    let originalFile = pofol.imgSrc? pofol.imgSrc.replace("http://101.101.211.45:8000/", "static/"): null;
    let newFile = req.file ? "http://101.101.211.45:8000/img/"+ req.file.filename : null ;

    if(newFile && fs.existsSync(originalFile)){
        try{
            fs.unlinkSync(originalFile)
        }catch(err){
            console.error(err)
        }
    }

    const sqlQuery = `INSERT INTO portfolio_item 
        (idx, title, themeColor, opacity, imgSrc, skill, linkSite, linkGithub, linkFigma, dateStart, dateEnd, contents, colOrder)
        VALUES 
        (${pofol.idx ? pofol.idx : null}, '${pofol.title}', '${pofol.themeColor}', ${pofol.opacity}, '${newFile}', '${pofol.skill}', 
            '${pofol.linkSite}', '${pofol.linkGithub}', '${pofol.linkFigma}', '${pofol.dateStart}', '${pofol.dateEnd}', '${pofol.contents}', '${pofol.colOrder}') 
        ON DUPLICATE KEY UPDATE 
        title = '${pofol.title}',
        themeColor = '${pofol.themeColor}',
        opacity = '${pofol.opacity}',
        imgSrc = '${newFile ? newFile : pofol.imgSrc}',
        skill = '${pofol.skill}',
        linkSite = '${pofol.linkSite}',
        linkGithub = '${pofol.linkGithub}',
        linkFigma = '${pofol.linkFigma}',
        dateStart = '${pofol.dateStart}',
        dateEnd = '${pofol.dateEnd}',
        contents = '${pofol.contents}',
        colOrder = '${pofol.colOrder}' ;`;
    db.query(sqlQuery, (err, result)=>{
        res.send(true);
    })
})



module.exports = router;