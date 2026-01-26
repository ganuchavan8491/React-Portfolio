import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import Loader from './components/Loader'
import Work from './components/Work'
import Skills from './components/Skills'
import LionScene from './components/Lionscene'
import Contact from './components/Contact'
import Hero from './components/Hero'
import catImg from './assets/images/cat.gif'
import './App.css'


const App = () => {
  return (
    <div>
      <img src={catImg} className="cat" alt="walking cat" />
      <Nav/>
      <Hero/>
      <Loader/>
      <LionScene/>
      <Home/>
      <Skills/>
      <Work/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
