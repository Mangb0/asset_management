const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const database = require("./database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const members = [ // user 예시
    {
        userno: 1,
        id: "1",
        pw: "1",
        name: "hi",
        money: 200
    }
];

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/api/account', (req, res) => {
    // 쿠키 확인
    // if(req.cookies && req.cookies.account) {
    //     const user = JSON.parse(req.cookies.account);
    //     if(user.userno) {
    //         return res.send(user);
    //     }
    // }   
    // res.sendStatus(401);

    // 토큰 확인
    if(req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, "secretkey", (err, decoded) => {
            if(err){
                return res.sendStatus(401);
            }

            res.send(decoded);
        });
    }
    else {
        return res.sendStatus(401);
    }
});

app.post('/api/account', async (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    
    const user = await database.run(`SELECT * FROM user WHERE id=?&&pw=?`, [loginId, loginPw]);
    
    if(user) {
        // jwt토큰
        const token = jwt.sign({
            userno: user[0].userno,
            name: user[0].name,
            money: user[0].money
        }, "secretkey", {
            expiresIn: "15m",
            issuer: "backend"
        });
        res.cookie("token", token);

        // 쿠키
        // res.cookie("account", JSON.stringify(user[0]));

        res.send(user[0]);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/assets', async (req, res) => {
    const result = await database.run("SELECT * FROM wallet");
    res.send(result);
});

app.post("/api/assets", async (req, res) => {
    const date = new Date();

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '-' + month + '-' + day;

    
    await database.run(`INSERT INTO wallet (userno, income, money, date) VALUES (?, ?, ?, ?)`, [1, 0, req.body.content, dateStr]);
    const result = await database.run("SELECT * FROM wallet");
    res.send(result);
})

app.put("/api/assets/:changeno", async (req, res) => {
    await database.run(`UPDATE wallet SET money = ? where changeno = ?`, [req.body.content, req.params.changeno]);
    const result = await database.run("SELECT * FROM wallet");
    res.send(result);
})

app.delete('/api/account', (req, res) => {
    // if(req.cookies && req.cookies.account) {
    //     res.clearCookie("account");
    // }
    if(req.cookies && req.cookies.token) {
        res.clearCookie("token");
    }

    res.sendStatus(200);
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
