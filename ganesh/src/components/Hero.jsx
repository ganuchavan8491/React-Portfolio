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

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useFrame(() => {
    if (!ref.current) return;

    const tx = hover ? mouse.x * 0.18 : 0;
    const ty = hover ? mouse.y * 0.18 : 0;

    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.1;
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.1;
  });

  return (
    <mesh
      ref={ref}
      scale={isMobile ? 2.3 : 3.4}
      onPointerMove={(e) => {
        const { x, y } = e.intersections[0].uv;
        setMouse({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 });
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <planeGeometry args={isMobile ? [1.6, 2.7] : [3.2, 1.8]} />
      <meshStandardMaterial map={texture} roughness={0.2} />
    </mesh>
  );
}

export default function Hero() {
  return (
    <div className="hero-sec">
      <Canvas shadows camera={{ position: [0, 0, 11], fov: 40 }}>
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[4, 5, 6]}
          intensity={1.2}
          castShadow
        />
        <Environment preset="city" />
        <HeroCard />
      </Canvas>
    </div>
  );
}
