import { useEffect, useRef } from 'react';
import styles from './HeroArt.module.css';

export default function HeroArt() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const layers = scene.querySelectorAll('[data-speed]');
      const x = (e.clientX - window.innerWidth / 2) / 100;
      const y = (e.clientY - window.innerHeight / 2) / 100;
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    const handleMouseLeave = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      scene.querySelectorAll('[data-speed]').forEach(layer => {
        layer.style.transform = 'translate(0px, 0px)';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.heroArt} ref={sceneRef}>
      {/* SVG filter */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="sand-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.8 0 0 0  0 0.6 0 0 0  0 0 0 0.25 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="textured" />
            <feBlend mode="multiply" in="textured" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Track curve */}
      <div className={styles.trackCurve} data-speed="-2" />

      {/* Sand blob */}
      <div className={styles.objSand} data-speed="4" />

      {/* Clock shadow */}
      <div className={styles.objClockShadow} data-speed="1" />

      {/* Clock */}
      <div className={styles.objClock} data-speed="1">
        <div className={styles.clockHandV} />
        <div className={styles.clockHandH} />
      </div>

      {/* Toggle */}
      <div className={styles.objToggle} data-speed="3">
        <div className={styles.toggleKnob} />
      </div>

      {/* Hex shadow */}
      <div className={styles.objHexShadow} data-speed="-3" />

      {/* Hex */}
      <div className={styles.objHex} data-speed="-3" />

      {/* Play button blob */}
      <div className={styles.objPlay} data-speed="2">
        <div className={styles.playIcon} />
      </div>
    </div>
  );
}
