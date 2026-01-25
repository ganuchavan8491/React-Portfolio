import React from 'react'
import '../assets/work.css'

const Work = () => {

  const openLink = (url) => {
    window.open(url, "_blank")
  }

  return (
    <>
      <div className='work-section'>
        <div className="title">
          <h1 className="subtitle">WATCH MY</h1>
          <div className="heading">ARTWORK</div>
        </div>
        <div className='gap'></div>

        <table className="portfolio-table">
          <tbody>

            <tr onClick={() => openLink("http://www.azaaditheband.com")}>
              <td>2024</td>
              <td>Azaadi The Band</td>
              <td>Official Band Website</td>
            </tr>

            <tr onClick={() => openLink("https://ganuchavan8491.github.io/Maaya-Creations/")}>
              <td>2024</td>
              <td>Maaya Jewellers</td>
              <td>Professional Landing Page</td>
            </tr>

            <tr onClick={() => openLink("https://ganuchavan8491.github.io/Sticky-Notes/")}>
              <td>2025</td>
              <td>Sticky Notes</td>
              <td>Stylish Sticky Notes Web App</td>
            </tr>

            <tr onClick={() => openLink("https://github.com/ganuchavan8491/password_generator")}>
              <td>2025</td>
              <td>Passkey (Password Manager)</td>
              <td>Python Tkinter App</td>
            </tr>

            <tr onClick={() => openLink("https://berojagar-engineer.vercel.app/")}>
              <td>2026</td>
              <td>Berojagar Engineer</td>
              <td>Personal Blog Website</td>
            </tr>

            <tr onClick={() => openLink("https://balugraphy-official-czek.vercel.app/")}>
              <td>2026</td>
              <td>Balugraphy Official</td>
              <td>Photography Website</td>
            </tr>

          </tbody>
        </table>
      </div>
    </>
  )
}

export default Work
