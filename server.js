const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { stripe_id } = require('./config');
const stripe = require('stripe')(stripe_id);
console.log(stripe_id)
const app = express();
app.use(cors());
app.use(flash());
const { secret } = require('./config').session;
const { connectionString } = require('./config').db;
const massiveConnection = massive(connectionString).then(db=>app.set('db', db)).catch(err => console.log(err) );
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/getProducts', (req, res) => {
    const db = req.app.get('db');
    db.getProducts().then(response => {
        res.send(response);
    }).catch(err => console.log(err))
})

app.post('/api/product', (req, res) => {
    const db = req.app.get('db');
    db.getProductInfo([req.body.id]).then(response => res.send(response));
})

app.post('/api/similarProducts', (req, res) => {
    const db = req.app.get('db');
    db.getSimilarProducts([req.body.theme, req.body.id]).then(response => res.send(response));
})

app.post('/api/payment', (req, res) => {
    stripe.charges.create({
        amount: 5000,
        currency: "usd",
        source: req.body.id,
        description: 'test'
      }, function(err, charge) {
          console.log('ERROR', err, 'CHARGE', charge);
      })
})

const port = 4040;
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});