const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const moment = require("moment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/matchDate", (req, res) => {
    const {
        year,
        month,
        day,
        format,
        patterns
    } = req.body;
    const form = moment(`${year}/${month}/${day}`).format(format);
    let ret = null;
    for (let pattern in patterns) {
        const rx = new RegExp(pattern);
        if (form.match(rx)) {
            ret = form.replace(rx, patterns[pattern]);
            break;
        }
    }
    res.text(ret);
});

app.post("/btoa", (req, res) => res.text(Buffer.from(req.body.src,"base64").toString()));
app.post("/atob", (req, res) => res.text(Buffer.from(req.body.src).toString('base64')));

app.post("/match", (req, res) => {
    const {str,pattern}=req.body;
    const match=str.match(pattern);
    
    res.json(match&&{
        match:match[0],
        ...match.slice(1)
    });
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log("Listening on port",PORT));
