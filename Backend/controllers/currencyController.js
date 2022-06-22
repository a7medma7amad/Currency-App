const axios = require(`axios`);
const { exchangeRates } = require("exchange-rates-api");


const convertBackend= async (req,res) =>{
console.log(req)
to=req.query["to"]
from=req.query["from"]
amount=req.query["amount"]
axios({
    method: 'get',
    url: "https://api.apilayer.com/fixer/convert?from="+from+"&to="+to+"&amount="+amount,
    headers: {
        'apikey' : process.env.APIKEY
    },
}).then(function (response) {
    console.log(response.data)
    const result = response.data
    const exchangeRate=result["info"]["rate"]
    const outputAmount=result["result"]
    res.send({exchangeRate , outputAmount})
}).catch(function (error) {
    console.log(error);
  });;
}

const getSymbols = async (req,res) =>{
    axios({
        method: 'get',
        url: "https://api.apilayer.com/fixer/symbols",
        headers: {
            'apikey' : "2fqEfh33h51W5I7cfM46fTKAnMmVnyXm"
        },
    }).then(function (res) {
        console.log(res.data)
        
    });
}

module.exports =
{
    convertBackend,
    getSymbols
}