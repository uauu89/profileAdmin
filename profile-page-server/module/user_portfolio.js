const express = require("express");
const router = express.Router();
const db = require("./modules").db;

router.get("/", (req, res)=>{
    const sqlQuery_item = "SELECT * FROM portfolio_item ORDER BY colOrder; ";
    const sqlQuery_tag = "SELECT * FROM portfolio_tag ORDER BY colOrder; ";

    db.query(sqlQuery_tag + sqlQuery_item, (err, result)=>{
        res.send(result);
    });

});
module.exports = router;