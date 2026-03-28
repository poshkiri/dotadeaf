"use client";

import { useEffect, useRef, useState } from "react";

export function AnimeCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const breatheRaf = useRef(0);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [breathe, setBreathe] = useState(0);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3000 + Math.random() * 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      setBreathe(Math.sin(t * 1.2) * 4);
      breatheRaf.current = requestAnimationFrame(animate);
    };
    breatheRaf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(breatheRaf.current);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 60);
      const factor = dist / 60;
      setPupilPos({
        x: Math.cos(angle) * factor * 6,
        y: Math.sin(angle) * factor * 6,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const kaguneOpacity = 0.35 + Math.abs(breathe) / 20;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        cursor: "none",
      }}
    >
      <svg
        viewBox="0 0 320 580"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{
          transform: `translateY(${breathe}px) ${hovering ? "scale(1.03)" : "scale(1)"}`,
          transition: "filter 0.3s ease",
          filter: hovering
            ? "drop-shadow(0 0 40px rgba(220,20,20,0.7))"
            : "drop-shadow(0 0 20px rgba(220,20,20,0.35))",
        }}
      >
        <defs>
          <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#e8c9a0" />
            <stop offset="100%" stopColor="#c4956a" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4444" stopOpacity="1" />
            <stop offset="60%" stopColor="#cc0000" stopOpacity="1" />
            <stop offset="100%" stopColor="#660000" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="normalEye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a3728" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="leftEyeClip">
            <ellipse cx="118" cy="185" rx="22" ry="16" />
          </clipPath>
          <clipPath id="rightEyeClip">
            <ellipse cx="202" cy="185" rx="22" ry="16" />
          </clipPath>
        </defs>

        <ellipse
          cx="160"
          cy="555"
          rx="90"
          ry="12"
          fill="rgba(0,0,0,0.5)"
          style={{ filter: "blur(8px)" }}
        />

        <ellipse
          cx="160"
          cy="300"
          rx="120"
          ry="160"
          fill="rgba(100,0,0,0.08)"
          filter="url(#glow)"
        />

        <rect x="138" y="310" width="44" height="50" rx="8" fill="url(#skinGrad)" />

        <path
          d="M60 382 L80 330 Q100 310 138 318 L138 360 L160 340 L182 360 L182 318 Q220 310 240 330 L260 382 Z"
          fill="#1a1a1a"
        />
        <path d="M138 318 L138 380 L160 355 L182 380 L182 318" fill="#111111" />
        <line x1="160" y1="355" x2="160" y2="382" stroke="#2a2a2a" strokeWidth="2" />

        <rect x="110" y="370" width="100" height="12" rx="4" fill="#2a2a2a" />
        <rect x="148" y="366" width="24" height="20" rx="3" fill="#F5C518" />
        <rect x="152" y="370" width="16" height="12" rx="2" fill="#1a1a1a" />

        <path
          d="M110 382 L100 480 L140 480 L160 430 L180 480 L220 480 L210 382 Z"
          fill="#111111"
        />
        <line x1="140" y1="382" x2="132" y2="480" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="180" y1="382" x2="188" y2="480" stroke="#1a1a1a" strokeWidth="2" />

        <path
          d="M100 470 L95 530 Q95 545 115 545 L145 545 L145 480 L100 480 Z"
          fill="#0a0a0a"
        />
        <path
          d="M175 480 L175 545 L205 545 Q225 545 225 530 L220 470 Z"
          fill="#0a0a0a"
        />
        <path
          d="M100 490 Q108 485 115 490"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />
        <path
          d="M205 490 Q213 485 220 490"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />

        <path
          d="M125 315 Q160 335 195 315 L195 325 Q160 345 125 325 Z"
          fill="#0a0a0a"
        />

        <ellipse cx="160" cy="175" rx="85" ry="95" fill="url(#skinGrad)" />

        <path
          d="M75 155 Q70 80 120 55 Q160 35 200 55 Q245 75 245 150 Q230 100 200 95 Q160 80 120 95 Q90 105 85 140 Z"
          fill="#1a0f0a"
        />
        <path d="M75 155 Q72 120 85 100 Q78 130 80 158" fill="#1a0f0a" />
        <path d="M245 150 Q242 115 235 100 Q242 125 243 152" fill="#1a0f0a" />
        <path d="M120 90 Q130 110 125 130 Q118 108 115 95 Z" fill="#150d07" />
        <path d="M145 78 Q150 100 148 120 Q143 98 142 82 Z" fill="#150d07" />
        <path d="M170 76 Q173 98 170 118 Q166 97 168 80 Z" fill="#150d07" />
        <path d="M195 85 Q200 105 198 125 Q191 104 192 88 Z" fill="#150d07" />

        <path
          d="M95 162 Q118 155 138 160"
          stroke="#1a0f0a"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M182 160 Q200 155 225 162"
          stroke="#1a0f0a"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        <g>
          <ellipse cx="118" cy="185" rx="22" ry="16" fill="white" />
          <g clipPath="url(#leftEyeClip)">
            <ellipse
              cx={118 + pupilPos.x * 0.7}
              cy={185 + pupilPos.y * 0.7}
              rx="13"
              ry="13"
              fill="url(#normalEye)"
            />
            <ellipse
              cx={118 + pupilPos.x * 0.7}
              cy={185 + pupilPos.y * 0.7}
              rx="7"
              ry="7"
              fill="#0a0505"
            />
            <ellipse
              cx={114 + pupilPos.x * 0.7}
              cy={181 + pupilPos.y * 0.7}
              rx="3"
              ry="3"
              fill="white"
              opacity="0.8"
            />
          </g>
          {blinking && (
            <ellipse cx="118" cy="185" rx="22" ry="16" fill="url(#skinGrad)" />
          )}
          <path
            d="M96 185 Q118 172 140 185"
            fill="none"
            stroke="#1a0f0a"
            strokeWidth="2.5"
          />
        </g>

        <g filter="url(#strongGlow)">
          <ellipse cx="202" cy="185" rx="22" ry="16" fill="#1a0000" />
          <g clipPath="url(#rightEyeClip)">
            <ellipse
              cx={202 + pupilPos.x}
              cy={185 + pupilPos.y}
              rx="14"
              ry="14"
              fill="url(#eyeGlow)"
            />
            <line
              x1="184"
              y1="183"
              x2="192"
              y2="185"
              stroke="#cc0000"
              strokeWidth="1"
              opacity="0.7"
            />
            <line
              x1="185"
              y1="188"
              x2="193"
              y2="187"
              stroke="#cc0000"
              strokeWidth="0.8"
              opacity="0.5"
            />
            <line
              x1="220"
              y1="182"
              x2="212"
              y2="185"
              stroke="#cc0000"
              strokeWidth="1"
              opacity="0.7"
            />
            <ellipse
              cx={202 + pupilPos.x}
              cy={185 + pupilPos.y}
              rx="5"
              ry="7"
              fill="#000000"
            />
            <ellipse
              cx={198 + pupilPos.x}
              cy={181 + pupilPos.y}
              rx="2.5"
              ry="2.5"
              fill="white"
              opacity="0.6"
            />
          </g>
          <ellipse
            cx="202"
            cy="185"
            rx="22"
            ry="16"
            fill="none"
            stroke="#ff0000"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {hovering && (
            <>
              <ellipse
                cx="202"
                cy="185"
                rx="28"
                ry="22"
                fill="none"
                stroke="#ff0000"
                strokeWidth="1"
                opacity="0.4"
                style={{ filter: "blur(3px)" }}
              />
              <ellipse
                cx="202"
                cy="185"
                rx="35"
                ry="28"
                fill="rgba(255,0,0,0.06)"
                style={{ filter: "blur(8px)" }}
              />
            </>
          )}
          {blinking && (
            <ellipse cx="202" cy="185" rx="22" ry="16" fill="url(#skinGrad)" />
          )}
          <path
            d="M180 185 Q202 172 224 185"
            fill="none"
            stroke="#1a0f0a"
            strokeWidth="2.5"
          />
        </g>

        <path
          d="M153 210 Q160 220 167 210"
          fill="none"
          stroke="#b8845a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M135 238 Q160 252 185 238"
          fill="none"
          stroke="#8a5a3a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M182 238 Q188 242 186 248"
          fill="none"
          stroke="#8a5a3a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M75 195 Q72 240 90 275 Q115 305 145 308 L145 290 Q120 285 102 260 Q88 238 90 200 Z"
          fill="#e8e0d0"
          stroke="#c8b8a0"
          strokeWidth="1.5"
        />
        <path
          d="M95 220 Q105 225 100 240"
          stroke="#a09080"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M88 255 Q100 258 98 268"
          stroke="#a09080"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="108"
          cy="205"
          rx="16"
          ry="12"
          fill="none"
          stroke="#c8b8a0"
          strokeWidth="1.5"
        />
        <ellipse cx="108" cy="205" rx="8" ry="7" fill="rgba(200,0,0,0.15)" />

        <path
          d="M240 280 Q280 240 290 200 Q285 250 270 290 Q255 330 245 350"
          fill="none"
          stroke="#cc0000"
          strokeWidth="3"
          opacity={kaguneOpacity}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px #ff0000)" }}
        />
        <path
          d="M245 290 Q295 260 310 230 Q300 270 280 300 Q265 325 252 345"
          fill="none"
          stroke="#880000"
          strokeWidth="2"
          opacity={kaguneOpacity * 0.75}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
