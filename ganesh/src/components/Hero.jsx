import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import heroDesk from "../assets/images/hero.png";
import heroMob from "../assets/images/hero-mob.png";
import "../assets/hero.css";

function HeroCard() {
  const [isMobile, setIsMobile] = useState(false);
  const texture = useTexture(isMobile ? heroMob : heroDesk);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    // Mouse tracking effect
    const { x, y } = state.mouse;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.4, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.4, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} scale={isMobile ? 2.5 : 3.8} castShadow>
        <planeGeometry args={isMobile ? [1.6, 2.7] : [3.2, 1.8]} />
        {/* Transparent rounded corners effect ke liye map ke saath meshStandard use karein */}
        <meshStandardMaterial 
          map={texture} 
          roughness={0.1} 
          metalness={0.2}
          transparent={true}
        />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  const orbitTags = ["3D VISUALS", "REACT JS", "UI/UX", "INTERACTIVE", "DESIGN"];

  return (
    <div className="hero-sec">
      {/* Background Decor */}
      <div className="bg-glow" />
      
      <div className="hero-stage">
        <div className="hero-content-overlay">
          <h1 className="hero-title">CREATIVE <span>DEVELOPER</span></h1>
        </div>

        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <Environment preset="apartment" />
            <HeroCard />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
          </Canvas>
        </div>

        {orbitTags.map((tag, index) => (
          <div key={tag} className={`orbit-tag orbit-${index + 1}`}>
            <div className="tag-dot" />
            {tag}
          </div>
        ))}
      </div>

      <div className="scroll-cue">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <p>SCROLL TO EXPLORE</p>
      </div>
    </div>
  );
}