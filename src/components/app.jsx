import React from "react";
import CurrencyData from "./amount";
import Header from "./header";
import Navbar from "./navigator";
import Chart from "./charts";
import Footer from "./footer";
function App(){
    return <div >
        <Navbar />
        <Header />
        <CurrencyData />
        <Chart/>
        <Footer />
    </div>;
}

export default App;
