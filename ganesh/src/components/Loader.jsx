import React, { useEffect, useRef, useState } from 'react';
import '../assets/loader.css'

const Loader = ({ children, delay = "0ms" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 'isIntersecting' true hota hai jab element screen par dikhe
          // Isse toggle karne se scroll up/down dono par animation kaam karega
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // Jab 20% element dikhe tab animation start ho
    );

    const { current } = domRef;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-20 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export default Loader;