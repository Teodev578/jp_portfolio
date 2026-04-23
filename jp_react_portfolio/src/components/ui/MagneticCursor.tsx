import { useEffect, useRef } from 'react';
import '../../styles/magneticCursor.css';

// Liste des petits éléments de code et compétences qui vont tomber
const CODE_SNIPPETS = [
    '{ }', '< />', '=>', '()', ';;', 'div', 'npm', '===',
    'Flutter', 'React', 'TypeScript', 'Python', 'Figma', 'UX/UI', 'R&D', 'Firebase'
];

export const MagneticCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Refs pour calculer la vitesse sans déclencher de re-rendu React
    const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });
    const lastParticleTime = useRef(0);

    useEffect(() => {
        // On désactive la logique si l'appareil n'a pas de pointeur précis (ex: tactile pur)
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        // Fonction pour créer un élément qui tombe
        const createFallingCode = (x: number, y: number) => {
            const particle = document.createElement('span');
            particle.className = 'falling-code-particle';

            // Choix aléatoire du texte
            particle.textContent = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];

            // Position de départ (position de la souris)
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Rotation aléatoire pour plus de naturel (-45deg à 45deg)
            const randomRotation = (Math.random() - 0.5) * 90;
            particle.style.setProperty('--rot', `${randomRotation}deg`);

            document.body.appendChild(particle);

            // On détruit l'élément après l'animation (3 secondes) pour vider la mémoire
            setTimeout(() => {
                particle.remove();
            }, 3000);
        };

        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            const now = Date.now();

            // S'assurer que le curseur est visible dès qu'on bouge la souris
            cursor.classList.remove('hidden');
            ring.classList.remove('hidden');

            // === CALCUL DE LA VITESSE ===
            const dt = now - lastMouse.current.time;
            if (dt > 0) {
                const dx = x - lastMouse.current.x;
                const dy = y - lastMouse.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const speed = distance / dt;

                // Si la vitesse est élevée (> 2) ET qu'on n'a pas créé de particule depuis 40ms
                if (speed > 2.5 && now - lastParticleTime.current > 40) {
                    createFallingCode(x, y);
                    lastParticleTime.current = now;
                }
            }

            // Mise à jour des positions pour le prochain calcul
            lastMouse.current = { x, y, time: now };

            // === COMPORTEMENT NORMAL DU CURSEUR ===
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            const target = e.target as HTMLElement;
            const isHoverable = target.closest('a, button, .clickable');

            if (isHoverable) {
                ring.classList.add('hovering');
                cursor.classList.add('hovering');
            } else {
                ring.classList.remove('hovering');
                cursor.classList.remove('hovering');
            }
        };

        const handleMouseDown = () => ring.classList.add('active');
        const handleMouseUp = () => ring.classList.remove('active');
        const handleMouseEnter = () => {
            cursor.classList.remove('hidden');
            ring.classList.remove('hidden');
        };
        const handleMouseLeave = () => {
            cursor.classList.add('hidden');
            ring.classList.add('hidden');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseenter', handleMouseEnter);
            document.addEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor-dot hidden" />
            <div ref={ringRef} className="custom-cursor-ring hidden" />
        </>
    );
};

