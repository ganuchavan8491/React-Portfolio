import { useEffect, useState } from "react";
import {
  FaCss3Alt,
  FaHtml5,
  FaLaptopCode,
  FaMobileScreenButton,
  FaPython,
  FaReact,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import "../assets/floatingDecor.css";

const decorItems = [
  { id: 1, icon: FaHtml5, left: "8%", top: "12%", size: 25, depth: 0.05, delay: 0, duration: 5.4, kind: "tech html" },
  { id: 2, icon: FaCss3Alt, left: "88%", top: "17%", size: 25, depth: 0.08, delay: 0.5, duration: 6.5, kind: "tech css" },
  { id: 3, icon: FaReact, left: "15%", top: "46%", size: 24, depth: 0.03, delay: 0.9, duration: 4.8, kind: "tech react" },
  { id: 4, icon: FaPython, left: "81%", top: "42%", size: 24, depth: 0.06, delay: 1.1, duration: 6.1, kind: "tech python" },
  { id: 5, icon: FaScrewdriverWrench, left: "4%", top: "74%", size: 23, depth: 0.09, delay: 1.4, duration: 6.2, kind: "tech tools mobile-hide" },
  { id: 6, icon: FaMobileScreenButton, left: "67%", top: "71%", size: 23, depth: 0.05, delay: 0.3, duration: 5.1, kind: "tech mobile" },
  { id: 7, icon: FaLaptopCode, left: "46%", top: "18%", size: 22, depth: 0.04, delay: 1.6, duration: 5.8, kind: "tech laptop mobile-hide" },
  { id: 8, icon: TbCube3dSphere, left: "90%", top: "75%", size: 23, depth: 0.04, delay: 0.7, duration: 4.6, kind: "tech cube" },
];

export default function FloatingDecor() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-layer" aria-hidden="true">
      {decorItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`float-item ${item.kind}`}
            style={{
              left: item.left,
              top: item.top,
              transform: `translate3d(0, ${Math.round(-scrollY * item.depth)}px, 0)`,
              zIndex: item.id % 2 === 0 ? 2 : 1,
            }}
          >
            <span
              className="float-inner"
              style={{
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              }}
            >
              <Icon size={item.size} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
