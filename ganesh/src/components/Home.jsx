import React, { useEffect, useState } from "react";
import "../assets/home.css";
import { FaGithub, FaHandPeace } from "react-icons/fa";

const content = [
  "I’m Ganesh, a ",
  { text: "Full Stack Developer", highlight: "primary" },
  " and ",
  { text: "UI/UX Designer", highlight: "secondary" },
  " who enjoys building ",
  { text: "scalable, reliable applications", highlight: "primary" },
  " with clean design and smooth user experiences.",
  "\n",
  "I focus on creating products that not only work well ",
  { text: "behind the scenes", highlight: "secondary" },
  " but also feel ",
  { text: "effortless and intuitive", highlight: "primary" },
  " for users."
];

const Home = () => {
  const [display, setDisplay] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  const flatText = content
    .map(item => (typeof item === "string" ? item : item.text))
    .join("");

  useEffect(() => {
    const section = document.querySelector(".hero");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add("reveal");
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplay(flatText.slice(0, index));

      if (index >= flatText.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [startTyping, flatText]);

  const renderedContent = content.reduce(
    (acc, item, i) => {
      const text = typeof item === "string" ? item : item.text;
      const slice = display.slice(acc.pos, acc.pos + text.length);
      const element = (
        <span
          key={i}
          className={
            item.highlight === "primary"
              ? "highlight-primary"
              : item.highlight === "secondary"
              ? "highlight-secondary"
              : "normal"
          }
        >
          {slice}
        </span>
      );
      acc.pos += text.length;
      acc.elements.push(element);
      return acc;
    },
    { pos: 0, elements: [] }
  ).elements;

  return (
    <>
      <section className="hero">
        <h1 className="subtitle typing">{renderedContent}</h1>

        <div className="btn-section">
          <a
            href="https://www.instagram.com/ganeshchavan_gc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">
              Say hi <FaHandPeace className="icon" />
            </button>
          </a>

          <a
            href="https://github.com/ganuchavan8491"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">
              Watch my repo <FaGithub className="icon" />
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
