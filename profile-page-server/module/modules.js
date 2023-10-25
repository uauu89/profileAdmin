const mysql = require("mysql");
const dbInfo = require("../ignore/jwt").dbInfo;

const db = mysql.createConnection(dbInfo);

const dateFormatting = (time, type)=>{
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    if(type === "date"){
        return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
    }else if(type === "file"){
        return `${year.toString().slice(-2)}${("0"+month).slice(-2)}${date}${hour}${min}${sec}`;
    }
}



module.exports = {
    db,
    dateFormatting
}