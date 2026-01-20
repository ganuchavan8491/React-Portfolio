import { useEffect } from "react";
import '../assets/lion.css'

export default function LionScene() {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <div id="world"></div>

    </>
  );
}
