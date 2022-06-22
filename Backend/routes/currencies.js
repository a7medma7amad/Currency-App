const express = require('express')

const currencyRouter = express.Router()
const currencyController = require('../controllers/currencyController');

//routes
currencyRouter.get('/convert', currencyController.convertBackend )
currencyRouter.get('/getsymbols', currencyController.getSymbols )

module.exports = currencyRouter