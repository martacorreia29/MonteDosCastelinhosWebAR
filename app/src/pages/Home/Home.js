import React from 'react';
import logo from '../../resources/images/logo.png';
import TopButtons from "../../components/TopButtons/TopButtons.js"
import TextButton from "../../components/TextButton/TextButton.js"
import { Link } from 'react-router-dom';
import "./Home.css"
import "../../index.css"
import "@fontsource/lexend-deca";
import { setOrientation } from '../../utils/utils.js';

function Home() {
  setOrientation("portrait");
  return (
    <div className="Home" id="home">
      <TopButtons isHome={true} />
      <div className="content">
        <img src={logo} className="logo" alt="logo" />
        <div className="menu">
          <Link to={'/mapa'} className="nav-link"><TextButton href="/mapa" text="Visita" /></Link>
          <Link to={'/mais'} className="nav-link"><TextButton href="/mapa" text="Sobre" /></Link>
        </div>
      </div >
    </div>
  );
}
export default Home;