const axios = require(`axios`);
const { exchangeRates } = require("exchange-rates-api");
const Favourite = require("../models/Favourite");


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
    if(result["success"]==true){

    const exchangeRate=result["info"]["rate"]
    const outputAmount=result["result"]
    res.send({exchangeRate , outputAmount})
    }
    else{
        res.send({message:"error"})
    }
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

const getFavourites= async (req,res) =>{
    //console.log("d5lto")
    //console.log(req)
    username=req.query["username"]
    Favourite.find({"username":username}).then((result) => {
        res.send(result);
      }).catch(err => console.log(err));
}
const addFavourites= async (req,res) =>{
    //console.log(req)
    const username=req.body.username
    const conversion=req.body.conversion
    const newfavourite = new Favourite({
        username,
        conversion
    })
    newfavourite.save()
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("error")
    });
}

module.exports =
{
    convertBackend,
    getSymbols,
    getFavourites,
    addFavourites
}