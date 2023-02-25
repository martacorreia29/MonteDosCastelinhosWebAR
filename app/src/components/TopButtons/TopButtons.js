import React from 'react';
import BackButton from './BackButton';
import FullScreenButton from './FullScreenButton'
import "./TopButtons.css"

function TopButtons() {
  var isStartMenu = document.getElementById("app") != null;
  console.log(document.getElementById("app"))

  return (
    <div className="topButtons">
      {!isStartMenu &&
      <BackButton/>}
      <FullScreenButton/>
    </div>
  );
}

export default TopButtons;