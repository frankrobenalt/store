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
const app = express();
app.use(cors());
app.use(flash());
const { secret } = require('./config');
const { connectionString } = require('./config');
const massiveConnection = massive(connectionString).then(db=>app.set('db', db)).catch(err => console.log(err) );
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/build`));

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
    let meta = {};
    req.body.info.cart.map(cur => {
        meta[`${cur.cart_id}`] = cur.product.product_name + ' ' + cur.line + ' ' + cur.size
    });
    const db = req.app.get('db');
    stripe.charges.create({
        amount: req.body.info.total * 100,
        currency: "usd",
        source: req.body.token.id,
        description: `order for ${req.body.info.firstName} ${req.body.info.lastName}`,
        metadata: meta,
        receipt_email: req.body.info.email
      }, function(err, charge) {
          if(err){ 
            console.log('ERROR', err);
            return res.send('an error occured') 
          }
          db.addOrder({
              address: req.body.info.address,
              address_linetwo: req.body.info.addressLineTwo,
              name: `${req.body.info.firstName} ${req.body.info.lastName}`,
              email: req.body.info.email,
              orderInfo: req.body.info.cart
          }).then(response => {
              res.send('success');
          }).catch(error => {
              res.send('db error')
          })
      })
})

const port = 4040;
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});