import React from 'react'
import "./home.scss";
import {Button} from "react-bootstrap"

export default function Navbar() {
  return (
    <div className="container">
    <div className="logo">WEB APP</div>
    <div className="nav">
      <div className="navItems">
        <span> Products</span>
        <span> Services</span>
        <span> About</span>
     
      </div>
      <div className="navbuttons">
      <Button variant="primary">LOGIN</Button>{' '}
      <Button variant="primary">SIGN UP</Button>{' '}
      </div>
    </div>
  </div>
  )
}
