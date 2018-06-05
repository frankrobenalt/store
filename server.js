const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(flash());
const { secret } = require('./config').session;
const { connectionString } = require('./config').db;
massive(connectionString).then(db=>app.set('db', db));
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

const port = 4020;
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});