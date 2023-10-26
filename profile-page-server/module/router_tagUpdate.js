const express = require("express");
const router = express.Router();

const db = require("./modules").db;

router.post("/", (req, res)=>{

    let sqlQuery_tagModify = "";
    let count_new = req.body.new.length,
        count_mod = req.body.mod.length,
        count_del = req.body.del.length;

    let i = 0;
    while(i < count_new){
        sqlQuery_tagModify = sqlQuery_tagModify + `INSERT INTO portfolio_tag (name, color, colOrder) VALUES ('${req.body.new[i].name}', '${req.body.new[i].color}', '${req.body.new[i].colOrder}'); `;
        i++;
    }
    i = 0;
    while(i < count_mod){
        sqlQuery_tagModify = sqlQuery_tagModify + `UPDATE portfolio_tag SET name='${req.body.mod[i].name}', color='${req.body.mod[i].color}', colOrder='${req.body.mod[i].colOrder}' WHERE idx=${req.body.mod[i].idx}; `;
        i++;
    }
    i = 0;
    while(i < count_del){
        sqlQuery_tagModify = sqlQuery_tagModify + `DELETE FROM portfolio_tag WHERE idx=${req.body.del[i]}; `;
        i++;
    }
    
    db.query(sqlQuery_tagModify, (err,  result)=>{

        
        if(count_mod || count_del){
            db.query("SELECT idx, skill FROM portfolio_item;", (err, result)=>{
                result.forEach( i => {
                    let skillArray = i.skill;
                    if(count_mod){
                        req.body.mod.forEach((i, idx)=>{
                            let modName = i.name;
                            let original = req.body.original[idx].name
                            skillArray = skillArray.replace(original+",", modName+",");
                        })
                    }
                    if(count_del){
                        for(let name of req.body.delSkill){
                            skillArray = skillArray.replace(name+",", "");
                        }
                    }
                    if(skillArray !== i.skill){
                        const sqlQuery_removeTag = `UPDATE portfolio_item SET skill='${skillArray}' WHERE idx=${i.idx}`;
                        db.query(sqlQuery_removeTag);
                    }
                })
            })
        }
        res.send(true);
    })
})

module.exports = router;