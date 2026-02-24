import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";

import heroDesk from "../assets/images/hero.png";
import heroMob from "../assets/images/hero-mob.png";
import "../assets/hero.css";

function HeroCard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const texture = useTexture(isMobile ? heroMob : heroDesk);
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const tx = Math.sin(t * 0.45) * 0.05;
    const ty = Math.cos(t * 0.35) * 0.04;

    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.1;
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.1;
  });

  return (
    <mesh
      ref={ref}
      scale={isMobile ? 2.3 : 3.4}
      castShadow
      receiveShadow
    >
      <planeGeometry args={isMobile ? [1.6, 2.7] : [3.2, 1.8]} />
      <meshStandardMaterial map={texture} roughness={0.2} />
    </mesh>
  );
}

export default function Hero() {
  const orbitTags = ["3D", "REACT", "UI", "FAST", "DESIGN"];

  return (
    <div className="hero-sec">
      <div className="hero-stage">
        <div className="hero-canvas">
          <Canvas shadows camera={{ position: [0, 0, 11], fov: 40 }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 5, 6]} intensity={1.2} castShadow />
            <Environment preset="city" />
            <HeroCard />
          </Canvas>
        </div>

        {orbitTags.map((tag, index) => (
          <span key={tag} className={`orbit-tag orbit-${index + 1}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="scroll-cue">
        <span className="line" />
        <p>SCROLL</p>
      </div>
    </div>
  );
}
