const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const db = require("./modules").db;
const dateFormatting = require("./modules").dateFormatting;

const jwt = require("jsonwebtoken");
const secretObj = require("../ignore/jwt").jwtObj;


router.post("/", (req, res)=>{
    let resData = {
        data : {},
        match : false
    }
    const sqlQuery_adminAccount = `SELECT idx, ID, PW FROM portfolio_admin_account WHERE ID='${req.body.ID}';`;
    
    db.query(sqlQuery_adminAccount, (err,  result)=>{
      
        if(result.length){
            let hashPW = crypto.createHash("sha512").update(req.body.PW).digest("hex");
            resData.match = req.body.ID === result[0].ID && hashPW === result[0].PW;
    
            let currentTime = dateFormatting(new Date(),"date");

            if(resData.match){
                db.query(`UPDATE portfolio_admin_account SET lastLogin = '${currentTime}' WHERE idx =`+result[0].idx);
            }
            
            let token1 = jwt.sign(
                {ID : req.body.ID},
                secretObj.secret,
                {expiresIn : "30m"}
            )
        
            let token2 = jwt.sign(
                {PW : hashPW},
                secretObj.secret,
                {expiresIn : "30m"}
            )
            resData.data = [token1, token2];
        }
        res.send(resData);
    })

})


module.exports = router;