import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../assets/footer.css";

const footerContent = [
  <>You can get in touch<br />with me via <br /></>,
  {
    text: "Mail",
    icon: <FaEnvelope />,
    highlight: "primary",
    link: "mailto:ganeshchavan688002@gmail.com"
  },
  ", ",
  {
    text: "Instagram",
    icon: <FaInstagram />,
    highlight: "secondary",
    link: "https://www.instagram.com/ganeshchavan_gc/"
  },
  ", or ",
  {
    text: "LinkedIn",
    icon: <FaLinkedin />,
    highlight: "tertiary",
    link: "https://www.linkedin.com/in/ganeshchavan8491/"
  },
  "."
];

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`footer ${visible ? "footer-show" : ""}`}
    >
      <h2 className="footer-text">
        {footerContent.map((item, i) => {
          // non-clickable text
          if (typeof item === "string" || !item.text) {
            return <span key={i}>{item}</span>;
          }

          // clickable items
          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover-icon ${
                item.highlight === "primary"
                  ? "highlight-primary"
                  : item.highlight === "secondary"
                  ? "highlight-secondary"
                  : "highlight-tertiary"
              }`}
            >
              <span className="text">{item.text}</span>
              <span className="icon">{item.icon}</span>
            </a>
          );
        })}
      </h2>

      <h4 className="copyrights">
        created with ❤️ by me
      </h4>
    </footer>
  );
};

export default Footer;
