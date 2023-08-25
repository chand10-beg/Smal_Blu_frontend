import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LiveData from "./initData";


function CurrencyData(){
    const [symbol,setSymbol]=useState([]);
    const [currencyCodes,setCode]=useState([]);
    const [currencyL,setCurrencyL]=useState("")
    const [currencyR,setCurrencyR]=useState("")
    const [currencyRValue,setCurrencyRvalue]=useState("")
    const [currencyLValue,setCurrencyLvalue]=useState("")
    const [value1,setValue1]=useState("")
    const [value2,setValue2]=useState("")

    useEffect(() => {
      getData();
    }, []);

   function getData(){
 axios.get('http://data.fixer.io/api/latest?access_key=b45a3eb45d417816c9bb475848eeea2f')
    .then(response => {
        setSymbol(response.data.rates);
        setCode(Object.keys(response.data.rates));
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });

  
   }
   
   function handleChange1(e){
    setCurrencyL(e.target.value);
    setCurrencyLvalue(symbol[e.target.value]);
    setValue1("");
    setValue2("")
   }
   function handleChange2(e){
    setCurrencyR(e.target.value)
    setCurrencyRvalue(symbol[e.target.value]);
   }
   function handleConversion(e) {
    const inputValue = e.target.value;
    setValue1(inputValue);
  
    if (currencyLValue !== 0 && currencyRValue !== 0) {
      const conversionFactor = currencyRValue / currencyLValue;
      const convertedValue = inputValue * conversionFactor;
      setValue2(convertedValue);
    } else {
      setValue2("");
    }
  }
  return (
    <div>
    <div className="mainDiv">
      <div id="subDiv" >
      <button  className="convertBtn"><span style={{"color":"#fff"}}>Let's</span> Convert !</button>

      <div className="cardContainer" >

      <div className="card">
      <label htmlFor="">Select Currency One :</label>
      <select className="selectBox" value={currencyL} onChange={handleChange1}>
        
      <option value="">Select a Currency</option>
      {currencyCodes.map((code,index)=>(
      <option key={index} value={code}>{code}</option>
      ))}
      </select>
      <h4>Selected Currency is  {currencyL}</h4>
      <div>
      <input type="text" name="currency1" id="" placeholder="Enter the Value" onChange={handleConversion} value={value1}/>
      </div>
      
      </div>
      
      
      <i class="fa-solid fa-arrow-right-arrow-left arrow fa-2xl" style={{"color": "#fff"}}></i>
      <div className="card">
      <label htmlFor="">Select Currency Two :</label>
      <select className="selectBox" value={currencyR} onChange={handleChange2}>
      <option value="">Select a Currency</option>
           {currencyCodes.map((code,index)=>(
            <option key={index} value={code}>{code}</option>
           ))}
           </select>
           <h4>Selected Currency is  {currencyR}</h4>
           <div>
            <input type="text" name="currency2" id="" placeholder="Enter the Value" value={value2}/>
           </div>
      </div>
              
            
      <hr className="horiRule hide" style={{"height":"2px","backgroundColor":"grey"}}/> 
          </div>
          </div>
          
      <LiveData />
    </div> 
    <hr className="horiRule" style={{"height":"2px","backgroundColor":"grey"}}/> 
    </div>
  )
}


export default CurrencyData;