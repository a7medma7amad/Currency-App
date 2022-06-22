require('dotenv').config()
var cors = require('cors');
const express = require('express')
const currencyRoutes = require('./routes/currencies')
const authRoutes = require('./routes/authentication')
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const authRouter = require('./routes/authentication');
// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json(),urlencodedParser)

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));

// routes
app.use('/api/currencies',currencyRoutes)
app.use('/api/auth',authRouter)
// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})

