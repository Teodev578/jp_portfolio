import { useState, useEffect } from 'react';

import './App.css';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Preloader } from './components/layout/Preloader';

import { LanguageTransition } from './components/ui/LanguageTransition';
import { Marquee } from './components/ui/Marquee';
import { ReactLenis } from 'lenis/react';


function AppContent() {
    const { isLoaded, setIsLoaded } = usePreloader();

    // Intersection Observer for scroll animations
    useEffect(() => {
        if (!isLoaded) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const sections = document.querySelectorAll('section');
        sections.forEach(s => observer.observe(s));

        return () => observer.disconnect();
    }, [isLoaded]);

    return (
        <>
            {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}



            <LanguageTransition />

            <Header />

            <main>
                <Hero />
                <Marquee />
                <Services />
                <About />
                <Projects />
                <Contact />
            </main>
        </>
    );
}

// Custom hook to manage preloader state
function usePreloader() {
    const [isLoaded, setIsLoaded] = useState(false);
    return { isLoaded, setIsLoaded };
}

function App() {
    return (
        <LanguageProvider>
            <ReactLenis root>
                <AppContent />
            </ReactLenis>
        </LanguageProvider>
    );
}

export default App;