import React, { useEffect, useRef } from "react";
import "../assets/skill.css";
import img from '../assets/images/skills.png'

const tokens = [
  "HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "REACT", "WORDPRESS",
  "SHOPIFY", "GIT", "LINUX", "MYSQL", "SKILLS", "PYTHON",
  "DJANGO", "FASTAPI", "NUMPY", "PANDAS", "JAVA", "C++",
  "VS CODE", "API", "TOOLS", "MONGODB", "POSTMAN", "FIGMA",
  "CANVA", "GITHUB",
];

const frontend = [
  { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Bootstrap", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind", src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAPFBMVEX////G6fxsyvk/v/g4vfhhyPmz4vuK1PoAtfckufgvu/hTxPn6/f+h2/tGwPjS7v255fxMwviT1/qn3vsZjXhWAAAAbElEQVR4AeWOCQqAMAwEq11r06b3//9qAwiI0QfowHINC2N+yLJabE53uycgUGTtF11CmDqLLVdZ57iJhSt9V+4cCQB5a1RGJgr9FrrW866GbmpoGylISlNC3RxnsbY+hLbX0GSJIKE6zOajHN4ZA8/fNs9XAAAAAElFTkSuQmCC" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JQuery", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg"},
  { name: "Three.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"}
];

const backend = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "FastAPI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

const database = [
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "SQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SQLite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
];

const dataTools = [
  { name: "Pandas", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
];

const others = [
  { name: "WordPress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Github", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-original.svg" },  
  { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Blender", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg"},
  { name: "Canva", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"}
];

const Skills = () => {
  const iconRef = useRef(null);

  useEffect(() => {
    const items = iconRef.current.querySelectorAll(".icon-item");
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        items.forEach((el, i) => {
          el.style.transitionDelay = `${i * 0.12}s`;
          el.classList.add("show");
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    
    obs.observe(iconRef.current);
  }, []);

  const Render = (title, arr) => (
    <>
      <h2>{title}:</h2>
      <div className="icon-row">
        {arr.map((i, k) => (
          <img key={k} src={i.src} className="icon-item" alt={i.name} />
        ))}
      </div>
    </>
  );

  return (
    <div className="skill-body wave">
      <div className="skills-container">
        <div className="stuck-grid">
          {tokens.map((t, i) => <div key={i} className="grid-item">{t}</div>)} 
        </div>
      </div>

      <div className="skill-2">
        <div className="skills-icons" ref={iconRef}>
          {Render("Frontend", frontend)}
          {Render("Backend & APIs", backend)}
          {Render("Databases", database)}
          {Render("Data Science Tools", dataTools)}
          {Render("Other Tools", others)}
        </div>
        <div className="bitemoji">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Skills;
