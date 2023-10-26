const express = require("express");
const app = express();
const PORT = process.env.port || 8000;

const cors = require("cors");

const corsOption = {
    origin : "http://uauu.dothome.co.kr",
    credential : true,
}
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("static"));


app.listen(PORT, () => {
    console.log(`server is listening at localhost:${PORT}`);
});

// --- 유저 페이지
const userPortfolio = require("./module/user_portfolio");
app.use("/portfolio", userPortfolio);


// --- 관리자 페이지
const routerLogin = require("./module/router_login");
app.use("/adminLogin", routerLogin);

const routerSession = require("./module/router_sessionConfirm");
app.use("/adminSession", routerSession);

const routerGetData = require("./module/router_getData");
app.use("/adminGetData", routerGetData);


const routerPofolUpsert = require("./module/router_pofolUpsert");
app.use("/adminPofolUpsert", routerPofolUpsert);

const routerPofolDel = require("./module/router_pofolDel");
app.use("/adminPofolDel", routerPofolDel);

const routerTagUpdate = require("./module/router_tagUpdate");
app.use("/adminTagUpdate", routerTagUpdate);







