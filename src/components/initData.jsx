import React, { useState, useEffect } from "react";
import axios from "axios";

function LiveData() {
  const [symbol, setSymbol] = useState({});
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const currArrlive = ["USD", "INR","GBP", "AUD", "CAD", "CHF", "CNH", "JPY","SGD","HKD","THB","MYR","AED","KWD","BHD"];

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=b45a3eb45d417816c9bb475848eeea2f"
      )
      .then((response) => {
        setSymbol(response.data.rates);

        // Extract currency codes from the response
        setCurrencyCodes(Object.keys(response.data.rates));
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }

  // Filter the currencyCodes array to include only codes present in currArrlive
  const filteredCurrencyCodes = currencyCodes.filter((code) =>
    currArrlive.includes(code)
  );

  return (
    <div className="liveDataDiv">
        <h1 >Live Conversion Rates with </h1>
        <h1>respect To Euro</h1>
      <ul>
        {filteredCurrencyCodes.map((element, index) => (
          <li key={index}>
            <div className="dataDiv">
              <h4 style={{ color: "#000" }}>{element}</h4>
              <h4 style={{ color: "#000" }}>{symbol[element]}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveData;
