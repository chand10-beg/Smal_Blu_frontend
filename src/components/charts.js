import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";

function ChartCompt() {
  const [rates, setRates] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
 const [valueArrayUsd,setvalueArrayUSD]=useState([]);
 const [valueArrayINR,setvalueArrayINR]=useState([]);
 const [valueArrayGBP,setvalueArrayGBP]=useState([]);
 const [valueArraySGD,setvalueArraySGD]=useState([]);
 const [valueArrayAED,setvalueArrayAED]=useState([]);
 const [valueArrayHKD,setvalueArrayHKD]=useState([]);
 const [dateArr,setDateArr]=useState([]);
const [gotDate,setgotDate]=useState(true);


  async function fetchHistoryData() {
    const currentDate = new Date();
    const historicalData = [];
    const usdData=[];
    const inrData=[];
    const gbpData=[];
    const sgdData=[];
    const aedData=[];
    const hkdData=[];
    for (let i = 0; i < 7; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - i);
      const day = pastDate.getDate();
      const month = pastDate.getMonth() + 1;
      const year = pastDate.getFullYear();
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      try {
        const response = await axios.get(`http://data.fixer.io/api/${formattedDate}?access_key=b45a3eb45d417816c9bb475848eeea2f`);
        if (response && response.data) {
          const ratesData = response.data.rates;
          historicalData.push(ratesData);
          usdData.push(ratesData[USD]);
          inrData.push(ratesData[INR]);
          gbpData.push(ratesData[GBP]);
          hkdData.push(ratesData[HKD]);
          aedData.push(ratesData[AED]);
          sgdData.push(ratesData[SGD]);
          if (gotDate) {
            setDateArr(prevDateArr => [...prevDateArr, response.data.date]);
            setgotDate(false);
          }
        } else {
          console.error(`Error for ${formattedDate}:`, "Response or response data is undefined.");
          historicalData.push({});
        }
      } catch (error) {
        console.error(`Error for ${formattedDate}:`, error.response ? error.response.data : error.message);
        historicalData.push({}); // Push empty rates if there's an error
      }
      
    }

   setRates(historicalData);
   
   setvalueArrayUSD(usdData);
   setvalueArrayINR(inrData);
   setvalueArrayGBP(gbpData);
   setvalueArraySGD(sgdData);
   setvalueArrayAED(aedData);
   setvalueArrayHKD(hkdData);
  }

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const USD ="USD";
  const INR="INR";
  const GBP="GBP";
  const SGD="SGD";
  const AED="AED";
  const HKD="HKD";
Chart.defaults.color="#ffffff";
  Chart.defaults.font.size = 16;
  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [{
          label: 'USD vs EUR',
          data: valueArrayUsd,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)'
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)'
          ],
          borderWidth: 1
        }]
      };
      
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
             max:1.1,
             min:1.05
            }
          }
        }
      };

      const ctx = document.getElementById('myChart').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates,valueArrayUsd]);


  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [
          {
            label: 'INR vs EUR',
            data: valueArrayINR,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              max: 93, // Set a different max value for GBP chart
              min: 86 // Set a different min value for GBP chart
            }
          }
        }
      };
  
      const ctx = document.getElementById('myChart2').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates, valueArrayINR]);




  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [
          {
            label: 'GBP vs EUR',
            data: valueArrayGBP,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              max: 0.95 , // Set a different max value for GBP chart
              min: 0.8 // Set a different min value for GBP chart
            }
          }
        }
      };
  
      const ctx = document.getElementById('myChart3').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates, valueArrayGBP]);

  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [
          {
            label: 'SGD vs EUR',
            data: valueArraySGD,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderColor:"#FF0000"
          }
        ]
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              max: 1.55 , // Set a different max value for GBP chart
              min: 1.4 // Set a different min value for GBP chart
            }
          }
        }
      };
  
      const ctx = document.getElementById('myChart4').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates, valueArraySGD]);


  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [
          {
            label: 'AED vs EUR',
            data: valueArrayAED,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              max: 4.02 , // Set a different max value for GBP chart
              min: 3.95 // Set a different min value for GBP chart
            }
          }
        }
      };
  
      const ctx = document.getElementById('myChart5').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates, valueArrayAED]);


  useEffect(() => {
    if (rates.length > 0) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      
      const data = {
        labels: dateArr,
        datasets: [
          {
            
            label: 'HKD vs EUR',
            data: valueArrayHKD,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderColor:"#ff0000"
          }
        ]
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              max: 8.58 , // Set a different max value for GBP chart
              min: 8.44 // Set a different min value for GBP chart
            }
          }
        }
      };
  
      const ctx = document.getElementById('myChart6').getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }
  }, [rates, valueArrayHKD]);

  return (
    <div className="chartDiv" id="graphSection">
      <h1 style={{"color":"#fff"}}><span style={{"color":"#0180FF"}}>LIVE </span>CHARTS</h1>
<div className="chartCard">
      <canvas className="trendChart" id="myChart"></canvas>
      <canvas className="trendChart" id="myChart2"></canvas>
      <canvas className="trendChart" id="myChart3"></canvas>
      <canvas className="trendChart" id="myChart4"></canvas>
      <canvas className="trendChart" id="myChart5"></canvas>
      <canvas className="trendChart" id="myChart6"></canvas>
    </div>
    </div>
    
  );
}

export default ChartCompt;
