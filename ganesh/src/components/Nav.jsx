import React from 'react'
import '../assets/nav.css'
import profileImg from '../assets/images/navlogo.png'
import NavParticles from './NavParticles'
import cv from '../assets/files/GaneshResume.pdf'
import { FaFileArrowDown, FaLinkedinIn } from "react-icons/fa6";

const resume = () => {
  window.open( cv, "_blank");
}

const Nav = () => {
  return (
    <>
      <NavParticles />
      <div className="nav">
        
        <div className="left-section">
          <a href="https://www.linkedin.com/in/ganeshchavan8491/" target="_blank" rel="noopener noreferrer" className="profile-link">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <span className="social-chip"><FaLinkedinIn /> Connect</span>
          </a>
        </div>

        <div className="header-logo">
          <h1 className="subtitle">WHO IS !</h1>
          <div className="heading">GANESH</div>
        </div>

        <div className="right-section">
          <button className="resume-btn" onClick={resume}>
            <FaFileArrowDown />
            Resume
          </button>
        </div>

      </div>
    </>
  )
}

export default Nav
