import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//#1
import { Home } from "./pages/Home";
import { CoinDetail } from "./pages/CoinDetail";

export const App = () => {
  return (
    <BrowserRouter basename="/Crypto-Project">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} /> {/*#2*/}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
