import React from 'react'
import dinteroLogo from "../../assets/dintero_logo_black.svg";
import './style.css'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <React.Fragment>
        <div className="header">
      
        <img
          src={dinteroLogo}
          className="logo"
          alt="Dinteros logo"
          width="210"
        />
      </div>
    
      </React.Fragment>
    )
}

export default Header

