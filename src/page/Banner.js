import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main, Category, Farming } from 'containers/Banner';

const Banner = () => {
  return (
    <div>
      <Category />
      {/* <img className="background" src="img/bg.jpg" />
      <div className="main_logotable">
        <img className="main_logo" src="img/logo.png" />
        <Routes>
          <Route path="/" element={<Farming />} />
          <Route path="/Farming" element={<Farming />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default Banner;