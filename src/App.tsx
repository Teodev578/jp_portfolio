import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import './App.css';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Preloader } from './components/layout/Preloader';

import { SkillsRail } from './components/ui/SkillsRail';
import { LanguageTransition } from './components/ui/LanguageTransition';
import { ReactLenis, useLenis } from 'lenis/react';

function AppContent() {
    const { isLoaded, setIsLoaded } = usePreloader();
    const lenis = useLenis(ScrollTrigger.update);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        ScrollTrigger.clearScrollMemory();
    }, []);

    useEffect(() => {
        if (lenis) {
            const updateLenis = (time: number) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(updateLenis);
            gsap.ticker.lagSmoothing(0);
            
            // Re-sync on ScrollTrigger refresh
            let scrollPos = 0;
            const onRefreshInit = () => {
                scrollPos = lenis.scroll;
            };
            const onRefresh = () => {
                lenis.resize();
                // Force Lenis to restore the exact scroll position after GSAP rebuilds the layout
                lenis.scrollTo(scrollPos, { immediate: true });
            };

            ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
            ScrollTrigger.addEventListener("refresh", onRefresh);

            return () => {
                gsap.ticker.remove(updateLenis);
                ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
                ScrollTrigger.removeEventListener("refresh", onRefresh);
            };
        }
    }, [lenis]);

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
        }, { threshold: 0 });

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
                <SkillsRail />
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
        <ThemeProvider>
            <LanguageProvider>
                <ReactLenis root autoRaf={false}>
                    <AppContent />
                </ReactLenis>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;