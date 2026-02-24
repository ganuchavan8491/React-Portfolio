import { useEffect, useRef } from "react";
import "../assets/spider.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function SpiderFollower() {
  const spiderRef = useRef(null);
  const frameRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth * 0.45, y: window.innerHeight * 0.35 });
  const targetRef = useRef({ ...posRef.current });
  const desiredRef = useRef({ ...posRef.current });
  const roamRef = useRef({ ...posRef.current });
  const velocityRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const lastInputRef = useRef(0);
  const stepRef = useRef(0);

  useEffect(() => {
    const setInput = (x, y) => {
      desiredRef.current = { x, y };
      lastInputRef.current = performance.now();
    };

    const setRandomRoam = () => {
      roamRef.current = {
        x: 60 + Math.random() * Math.max(80, window.innerWidth - 120),
        y: 60 + Math.random() * Math.max(80, window.innerHeight - 120),
      };
    };

    const onMouseMove = (event) => setInput(event.clientX, event.clientY);
    const onTouchStart = (event) => {
      if (!event.touches[0]) return;
      setInput(event.touches[0].clientX, event.touches[0].clientY);
    };
    const onTouchMove = (event) => {
      if (!event.touches[0]) return;
      setInput(event.touches[0].clientX, event.touches[0].clientY);
    };

    const onResize = () => {
      posRef.current.x = clamp(posRef.current.x, 40, window.innerWidth - 40);
      posRef.current.y = clamp(posRef.current.y, 40, window.innerHeight - 40);
      targetRef.current.x = clamp(targetRef.current.x, 40, window.innerWidth - 40);
      targetRef.current.y = clamp(targetRef.current.y, 40, window.innerHeight - 40);
      desiredRef.current.x = clamp(desiredRef.current.x, 40, window.innerWidth - 40);
      desiredRef.current.y = clamp(desiredRef.current.y, 40, window.innerHeight - 40);
      setRandomRoam();
    };

    const tick = () => {
      const spiderNode = spiderRef.current;
      if (!spiderNode) {
        frameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const idle = now - lastInputRef.current > 3500;

      let goal = desiredRef.current;
      if (idle) {
        goal = roamRef.current;
        if (Math.hypot(goal.x - posRef.current.x, goal.y - posRef.current.y) < 65) {
          setRandomRoam();
        }
      }

      // Keep a delayed target so the spider reaches cursor with a visible lag.
      const cursorLag = idle ? 0.03 : 0.045;
      targetRef.current.x += (goal.x - targetRef.current.x) * cursorLag;
      targetRef.current.y += (goal.y - targetRef.current.y) * cursorLag;

      const delayedDx = targetRef.current.x - posRef.current.x;
      const delayedDy = targetRef.current.y - posRef.current.y;
      const followFactor = idle ? 0.0032 : 0.0072;
      const damping = 0.947;

      velocityRef.current.x = velocityRef.current.x * damping + delayedDx * followFactor;
      velocityRef.current.y = velocityRef.current.y * damping + delayedDy * followFactor;

      const maxSpeed = idle ? 1.35 : 2.25;
      const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        velocityRef.current.x *= scale;
        velocityRef.current.y *= scale;
      }

      posRef.current.x = clamp(posRef.current.x + velocityRef.current.x, 38, window.innerWidth - 38);
      posRef.current.y = clamp(posRef.current.y + velocityRef.current.y, 38, window.innerHeight - 38);

      const heading = Math.atan2(velocityRef.current.y, velocityRef.current.x);
      if (Number.isFinite(heading) && speed > 0.04) {
        let diff = heading - angleRef.current;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        angleRef.current += diff * 0.085;
      }

      const walkEnergy = clamp(speed / 2.2, 0.08, 0.9);
      stepRef.current += (idle ? 0.019 : 0.032) * (0.45 + walkEnergy);
      const gait = 1020 - walkEnergy * 320;
      const stride = 0.5 + walkEnergy * 2.1;
      const legAmp = 1.8 + walkEnergy * 3.6;
      const bodyBob = 0.15 + walkEnergy * 0.8;
      const bob = Math.sin(stepRef.current * 2) * 1.25 * walkEnergy;

      spiderNode.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y + bob}px, 0) rotate(${(angleRef.current * 180) / Math.PI + 180}deg)`;
      spiderNode.style.setProperty("--gait", `${gait.toFixed(0)}ms`);
      spiderNode.style.setProperty("--stride", `${stride.toFixed(2)}px`);
      spiderNode.style.setProperty("--leg-amp", `${legAmp.toFixed(2)}deg`);
      spiderNode.style.setProperty("--body-bob", `${bodyBob.toFixed(2)}px`);

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const spiderNode = spiderRef.current;
    if (spiderNode) {
      spiderNode.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(180deg)`;
      spiderNode.style.setProperty("--gait", "1020ms");
      spiderNode.style.setProperty("--stride", "0.7px");
      spiderNode.style.setProperty("--leg-amp", "3.2deg");
      spiderNode.style.setProperty("--body-bob", "0.3px");
    }

    setRandomRoam();
    frameRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="spider-layer" aria-hidden="true">
      <div className="spider-2d" ref={spiderRef}>
        <span className="spider-shadow" />
        <svg className="spider-legs-svg" viewBox="0 0 140 110">
          <defs>
            <linearGradient id="legTexture" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d1017" />
              <stop offset="40%" stopColor="#5f3f25" />
              <stop offset="68%" stopColor="#201a18" />
              <stop offset="100%" stopColor="#6d4628" />
            </linearGradient>
            <radialGradient id="abdomenGrad" cx="34%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#7b6f5d" />
              <stop offset="56%" stopColor="#302a24" />
              <stop offset="100%" stopColor="#121317" />
            </radialGradient>
            <radialGradient id="thoraxGrad" cx="34%" cy="22%" r="76%">
              <stop offset="0%" stopColor="#3d3731" />
              <stop offset="62%" stopColor="#1a1b20" />
              <stop offset="100%" stopColor="#0a0b0e" />
            </radialGradient>
            <radialGradient id="headGrad" cx="30%" cy="24%" r="75%">
              <stop offset="0%" stopColor="#383430" />
              <stop offset="68%" stopColor="#17191d" />
              <stop offset="100%" stopColor="#07080b" />
            </radialGradient>
          </defs>
          <g className="leg left leg-l1">
            <path d="M62 54 C48 41 30 29 16 23" />
            <path d="M16 23 C11 20 5 17 2 15" />
          </g>
          <g className="leg left leg-l2">
            <path d="M59 58 C43 56 25 53 12 49" />
            <path d="M12 49 C6 48 3 47 1 46" />
          </g>
          <g className="leg left leg-l3">
            <path d="M59 63 C45 72 28 80 16 86" />
            <path d="M16 86 C10 90 5 94 1 97" />
          </g>
          <g className="leg left leg-l4">
            <path d="M62 67 C52 82 41 97 34 106" />
            <path d="M34 106 C31 108 30 109 29 110" />
          </g>

          <g className="leg right leg-r1">
            <path d="M85 52 C100 39 116 30 128 24" />
            <path d="M128 24 C133 21 137 19 139 18" />
          </g>
          <g className="leg right leg-r2">
            <path d="M88 57 C104 54 120 52 132 49" />
            <path d="M132 49 C135 48 137 47 139 46" />
          </g>
          <g className="leg right leg-r3">
            <path d="M88 62 C103 72 118 81 130 88" />
            <path d="M130 88 C134 91 137 94 139 97" />
          </g>
          <g className="leg right leg-r4">
            <path d="M84 67 C94 83 102 97 108 107" />
            <path d="M108 107 C110 109 111 110 112 111" />
          </g>

          <g className="spider-core">
            <ellipse className="abdomen" cx="88" cy="58" rx="25" ry="19" />
            <ellipse className="abdomen-mark mark-1" cx="84" cy="56" rx="8.4" ry="6.2" />
            <ellipse className="abdomen-mark mark-2" cx="93" cy="60" rx="7.3" ry="5.1" />
            <ellipse className="abdomen-mark mark-3" cx="90" cy="52" rx="5.2" ry="3.9" />
            <ellipse className="thorax" cx="64" cy="58" rx="19" ry="14" />
            <ellipse className="joint-cover" cx="74" cy="58" rx="14.8" ry="11.8" />
            <ellipse className="head" cx="47" cy="58" rx="11" ry="8.6" />
            <circle className="eye" cx="44.7" cy="56.3" r="1.5" />
            <circle className="eye" cx="48.5" cy="56.3" r="1.5" />
            <path className="fang" d="M42.3 62.5 L38.5 66.6" />
            <path className="fang" d="M51.5 62.5 L54.4 66.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
