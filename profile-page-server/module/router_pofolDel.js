const express = require("express");
const router = express.Router();
const db = require("./modules").db;

const fs = require("fs");

router.post("/", (req, res)=>{
    const sqlQeury_imgSrc = `SELECT imgSrc FROM portfolio_item WHERE idx = ${req.body.idx};`;
    const sqlQuery = `DELETE FROM portfolio_item WHERE idx = ${req.body.idx}`;
    db.query(sqlQeury_imgSrc, (err, result)=>{
        let fileSrc = result[0].imgSrc.replace("http://101.101.211.45:8000", "static/");
        if(fs.existsSync(fileSrc)){
            try{
                fs.unlinkSync(fileSrc);
                db.query(sqlQuery, (err, result)=>{
                    res.send(true);
                })
            }catch(err){
                console.error(err)
            }
        }else{
            console.log("noexist")
        }
    })
})

module.exports = router;