const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secretObj = require("../ignore/jwt").jwtObj;

const db = require("./modules").db;


router.post("/", (req, res)=>{
    const token1 = req.body.token1,
        token2 = req.body.token2;

    if(token1 && token2){
        let decodedID = jwt.verify(token1, secretObj.secret).ID,
            decodedPW = jwt.verify(token2, secretObj.secret).PW;
        const sqlQuery_adminAccount = `SELECT idx, ID, PW FROM portfolio_admin_account WHERE ID='${decodedID}';`;
    
        db.query(sqlQuery_adminAccount, (err,  result)=>{
    
            let match = decodedID === result[0].ID && decodedPW === result[0].PW;
            res.send(match);
        })
    }else{
        res.send(false);
    }
    
})

module.exports = router;