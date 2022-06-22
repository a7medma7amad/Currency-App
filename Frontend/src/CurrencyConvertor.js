import './CurrencyConvertor.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState , useEffect} from "react";
import Button from '@mui/material/Button';

const axios = require('axios');

const currencies = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD',
'BTC','BTN','BWP','BYN','BYR','BZD','CAD','CDF','CHF','CLF','CLP','CNY','COP','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN',
'ETB','EUR','FJD','FKP','GBP','GEL','GGP','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','IMP','INR','IQD','IRR',
'ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKRLRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA',
'MKD','MMK','MNT','MOP','MRO','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN',
'PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SYP','SZL','THB','TJS','TMT','TND',
'TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPF','YER','ZAR','ZMK','ZMW','ZWL']



function CurrencyConvertor() {
  const [inputAmount, setinputAmount] = useState(0);
  const [inputCurrency, setInputCurrency] = useState('USD');
  const [outputCurrency, setOutputCurrency] =useState('EGP');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [outputAmount, setoutputAmount] = useState(0);
  const state="login"
  const update = (e) =>{
      console.log(inputAmount)
      console.log(inputCurrency)
      console.log(outputCurrency)
      axios.get('http://localhost:8000/api/currencies/convert?amount='+inputAmount+"&from="+inputCurrency+"&to="+outputCurrency)
      .then((response) => {
        console.log(response.data)
        const result=response.data
        setExchangeRate(result["exchangeRate"])
        setoutputAmount(result["outputAmount"])
      }).catch((error) => {
        
        console.log( error)
      });
  }
  const handleAmountChange = (event) => {
    setinputAmount(event.target.value);
    
  };
  const handleFromChange = (event) => {
    setInputCurrency(event.target.value);
  };
  const handleToChange = (event) => {
    setOutputCurrency(event.target.value);
  };

  return (
    <div className="mainContainer">
    <h1 className='text'>Currency Convertor</h1>
    <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="outlined-select-currency"
          label="Amount"
          type={'number'}
          value={inputAmount}
          onChange={handleAmountChange}
          onBlur={update}
          helperText="Please enter the amount of money to convert"
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-currency-native"
          select
          value={inputCurrency}
          onChange={handleFromChange}
          onBlur={update}
          SelectProps={{
            native: true,
          }}
          helperText="From"
        >
          {currencies.map((option) => (
            <option >
              {option}
            </option>
          ))}
        </TextField>
      </div>
      <div>
      <TextField
          id="outlined-select-currency-native"
          select
          value={outputCurrency}
          onChange={handleToChange}
          onBlur={update}
          SelectProps={{
            native: true,
          }}
          helperText="To"
        >
          {currencies.map((option) => (
            <option >
              {option}
            </option>
          ))}
        </TextField>
      </div>
      <div>
      <TextField
          id="outlined-select-currency"
          value = {exchangeRate}
          type={'number'}
          InputProps={{
            readOnly: true,
          }}
          helperText="Exchange Rate"
        >
        </TextField>
      </div>
      <div>
      <TextField
          id="outlined-select-currency"
          type={'number'}
          value = {outputAmount}
          InputProps={{
            readOnly: true,
          }}
          helperText="Output Amount"
        >
        </TextField>
      </div>
      <div>
      <Button variant="contained" >{state}</Button>
      </div>
    </Box>
    </div>
  );
}

export default CurrencyConvertor;