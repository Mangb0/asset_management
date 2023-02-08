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

app.post("/api/checkId", async (req, res) => {
    const result = await database.run(`SELECT id FROM user WHERE id=?`, [req.body.id]);
    console.log(typeof result);
    console.log(result);
    if(result) {
        res.sendStatus(200);
    }else {
        res.sendStatus(401);
    }
})

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

app.post("/api/signup", async (req, res) => {
    
    await database.run(`INSERT INTO user (id, pw, name) VALUES (?, ?, ?)`, [req.body.id, req.body.pw, req.body.name]);

    const user = await database.run(`SELECT * FROM user WHERE id=?&&pw=?`, [req.body.id, req.body.pw]);
    
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
})


app.post('/api/account', async (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    
    const user = await database.run(`SELECT * FROM user WHERE id=?&&pw=?`, [loginId, loginPw]);
    
    if(user[0]) {
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
    let userno;
    if(req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, "secretkey", (err, decoded) => {
            if(err){
                return res.sendStatus(401);
            }

            console.log(decoded.userno);
            userno = decoded.userno;
        });
    }
    else {
        return res.sendStatus(401);
    }
    const result = await database.run(`SELECT * FROM wallet WHERE userno=(?)`, [userno]);
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

app.post("/api/asseets", async (req, res) => {
    console.log(req.body);

    const date = new Date(req.body.date);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() +1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '-' + month + '-' + day;
    
    await database.run(`INSERT INTO wallet (userno, income, money, date) VALUES (?, ?, ?, ?)`, [req.body.userno, req.body.selected, req.body.money, dateStr]);
    
    if(req.body.selected == 0) {
      await database.run(`UPDATE user SET money = money + ? where userno = ?`, [req.body.money, req.body.userno]);
      console.log("입금");
    }else if(req.body.selected == 1) {
      await database.run(`UPDATE user SET money = money - ? where userno = ?`, [req.body.money, req.body.userno]);
      console.log("출금");
    }

})

app.put("/api/assets/:changeno", async (req, res) => {
    let money = [];
    let changemoney = await database.run(`SELECT money, income FROM wallet where changeno = ?`, [req.params.changeno]);

    console.log(changemoney);
    console.log(changemoney[0].money);
    money.push(changemoney[0].money);
    money.push(Number(req.body.content));
    if(changemoney[0].income==0) {
      await database.run(`UPDATE user SET money = money - ? where userno = ?`, [money[0]-money[1], req.body.userno]);  
      console.log("income");
    }
    else if(changemoney[0].income==1) {
      await database.run(`UPDATE user SET money = money + ? where userno = ?`, [money[0]-money[1], req.body.userno]);  
      console.log("income");
    }
    console.log(money[0]-money[1]);
    console.log(req.params);
    console.log(req.body);
    await database.run(`UPDATE wallet SET money = ? where changeno = ?`, [req.body.content, req.params.changeno]);
    const result = await database.run(`SELECT * FROM wallet where userno = ?`, [req.body.userno]);
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

app.get('/api/ranking', async (req, res) => {
  const result = await database.run(`SELECT * FROM user ORDER BY money DESC`);
  res.send(result);
});

app.get('/api/board', async (req, res) => {
  const result = await database.run(`SELECT * FROM board`);
  res.send(result);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});
