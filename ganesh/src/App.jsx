import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import Loader from './components/Loader'
import Work from './components/Work'
import Skills from './components/Skills'
import LionScene from './components/Lionscene'


const App = () => {
  return (
    <div>
      <Nav/>
      <Loader/>
      <LionScene/>
      <Home/>
      <Skills/>
      <Work/>
      <Footer/>
    </div>
  )
}

export default App
