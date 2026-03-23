import { useEffect, useState } from "react";
import { FaCss3Alt, FaHtml5, FaLaptopCode, FaMobileScreenButton, FaPython, FaReact, FaScrewdriverWrench } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import "../assets/floatingDecor.css";

const decorItems = [
  { id: 1, icon: FaHtml5, left: "5%", top: "10%", size: 40, depth: 0.1, delay: 0, duration: 8, kind: "tech html" },
  { id: 2, icon: FaCss3Alt, left: "85%", top: "15%", size: 35, depth: 0.15, delay: 1, duration: 7, kind: "tech css" },
  { id: 3, icon: FaReact, left: "12%", top: "50%", size: 50, depth: 0.05, delay: 2, duration: 9, kind: "tech react" },
  { id: 4, icon: FaPython, left: "80%", top: "45%", size: 30, depth: 0.2, delay: 1.5, duration: 6, kind: "tech python" },
  { id: 5, icon: FaScrewdriverWrench, left: "10%", top: "80%", size: 25, depth: 0.12, delay: 3, duration: 10, kind: "tech tools mobile-hide" },
  { id: 6, icon: FaMobileScreenButton, left: "70%", top: "75%", size: 35, depth: 0.08, delay: 0.5, duration: 7.5, kind: "tech mobile" },
  { id: 7, icon: FaLaptopCode, left: "45%", top: "20%", size: 45, depth: 0.03, delay: 2.5, duration: 11, kind: "tech laptop mobile-hide" },
  { id: 8, icon: TbCube3dSphere, left: "90%", top: "85%", size: 40, depth: 0.18, delay: 4, duration: 8.5, kind: "tech cube" },
];

export default function FloatingDecor() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-layer" aria-hidden="true">
      {decorItems.map((item) => {
        const Icon = item.icon;
        // Parallax logic: depth jitni zyada, movement utni fast
        const translateY = scrollY * item.depth;

        return (
          <div
            key={item.id}
            className={`float-item ${item.kind}`}
            style={{
              left: item.left,
              top: item.top,
              transform: `translate3d(0, ${translateY}px, 0)`,
              // Icons jitne 'door' honge (chote), utne blur honge
              filter: `blur(${item.depth * 10}px)`, 
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