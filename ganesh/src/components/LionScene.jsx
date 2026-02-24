import { useEffect, useState } from "react";
import '../assets/lion.css'

export default function LionScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js";
    script.async = false;
    document.body.appendChild(script);

    const customScript = document.createElement("script");
    customScript.src = "/script.js";
    customScript.async = false;
    document.body.appendChild(customScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(customScript);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div id="world"></div>

    </>
  );
}
