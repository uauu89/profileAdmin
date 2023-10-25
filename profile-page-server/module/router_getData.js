const express = require("express");
const router = express.Router();

const db = require("./modules").db;

router.get("/", (req, res)=>{
    const sqlQuery = "SELECT * FROM portfolio_tag ORDER BY colOrder; SELECT * FROM portfolio_item ORDER BY colOrder;"

    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    })
})

module.exports = router;