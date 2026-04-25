import { useState, useEffect } from 'react';
import logoJP from '../../assets/logo_jp.png';

interface PreloaderProps {
    onLoaded: () => void;
}

export const Preloader = ({ onLoaded }: PreloaderProps) => {
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        const handleLoad = () => {
            clearInterval(interval);
            setLoadingProgress(100);
            setTimeout(() => onLoaded(), 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
        return () => clearInterval(interval);
    }, [onLoaded]);

    return (
        <div id="preloader">
            <img src={logoJP} alt="Logo" className="preloader-logo" />
            <div className="progress-container">
                <div id="progress-bar" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <div id="progress-counter">{Math.round(loadingProgress)}%</div>
        </div>
    );
};
