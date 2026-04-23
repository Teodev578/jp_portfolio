import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GsapDemo() {
  const container = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation simple : rotation et translation
    gsap.to(boxRef.current, {
      rotation: 360,
      x: 100,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid #444', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#646cff' }}>Démo GSAP + React</h2>
      <p>Cette boîte est animée avec GSAP et le hook <code>useGSAP</code>.</p>
      <div 
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#646cff',
          borderRadius: '12px',
          margin: '2rem auto',
          boxShadow: '0 10px 20px rgba(100, 108, 255, 0.3)'
        }}
      />
    </div>
  );
}
