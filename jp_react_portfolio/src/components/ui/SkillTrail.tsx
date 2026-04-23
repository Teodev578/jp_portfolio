import { useEffect, useState } from 'react';
import '../../styles/skillTrail.css';

const SKILLS = ['Flutter', 'Python', 'React', 'Figma', 'TypeScript', 'Firebase', 'UX/UI', 'Automation', 'R&D'];

interface Point {
    x: number;
    y: number;
}

export const SkillTrail = () => {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = { x: e.clientX, y: e.clientY };
            setPoints(prev => {
                const updated = [newPoint, ...prev];
                return updated.slice(0, SKILLS.length * 3); // Garde assez de points pour la trainée
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="skill-trail-container">
            {SKILLS.map((skill, index) => {
                // On espace les mots dans la trainée
                const pointIndex = index * 3;
                const point = points[pointIndex];

                if (!point) return null;

                return (
                    <span
                        key={index}
                        className="skill-trail-text"
                        style={{
                            left: point.x,
                            top: point.y,
                            opacity: 1 - (index / SKILLS.length),
                            transform: `scale(${1 - (index / (SKILLS.length * 2))}) translate(-50%, -50%)`,
                            transitionDelay: `${index * 0.05}s`
                        }}
                    >
                        {skill}
                    </span>
                );
            })}
        </div>
    );
};
