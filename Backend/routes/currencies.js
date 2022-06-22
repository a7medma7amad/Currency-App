const express = require('express')

const currencyRouter = express.Router()
const currencyController = require('../controllers/currencyController');

//routes
currencyRouter.get('/convert', currencyController.convertBackend )
currencyRouter.get('/getsymbols', currencyController.getSymbols )
currencyRouter.get('/getfavourites', currencyController.getFavourites )
currencyRouter.post('/addfavourite', currencyController.addFavourites )
module.exports = currencyRouter