import React from 'react'
import '../assets/work.css'

const Work = () => {
  const openLink = (url) => {
    window.open(url, "_blank")
  }

  // const projects = [
  //   { id: 1, src: "https://picsum.photos/400/300?random=11", title: "Azaadi Band",     variant: "variant-1" },
  //   { id: 2, src: "https://picsum.photos/400/300?random=12", title: "Maaya Jewellers", variant: "variant-2" },
  //   { id: 3, src: "https://picsum.photos/400/300?random=13", title: "Sticky Notes",    variant: "variant-3" },
  //   { id: 4, src: "https://picsum.photos/400/300?random=14", title: "Passkey App",     variant: "variant-1" },
  //   { id: 5, src: "https://picsum.photos/400/300?random=15", title: "Berojagar Blog",  variant: "variant-2" },
  //   { id: 6, src: "https://picsum.photos/400/300?random=16", title: "Photography",     variant: "variant-3" },
  //   { id: 7, src: "https://picsum.photos/400/300?random=17", title: "E-comm Bot",      variant: "variant-1" },
  // ]

  return (
    <div className='work-section'>

      {/* Title */}
      <div className="title">
        <div className="heading">ARTWORK</div>
        <h1 className="subtitle">WATCH MY WORK</h1>
      </div>

      <div className='gap'></div>

      {/* Portfolio Table */}
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

      {/* Scrapbook Section */}
      {/* <div className="scrapbook-area">
        <div className="scrapbook-layout">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`scrap-paper ${project.variant} rotate-${index % 4}`}
            >
              <img src={project.src} alt={project.title} />
              <p className="handwritten">{project.title}</p>
            </div>
          ))}
        </div>
      </div> */}

    </div>
  )
}

export default Work