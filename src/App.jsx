import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import Appointment from './pages/Appointment/Appointment';
import Queue from './pages/Queue/Queue';

function App() {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('niramay_language') || 'en';
    });

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        localStorage.setItem('niramay_language', language);
    }, [language]);

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div>
            <Navbar language={language} setLanguage={setLanguage} />
            
            {currentPath === '/appointment' ? (
                <Appointment language={language} />
            ) : currentPath === '/queue' ? (
                <Queue language={language} />
            ) : (
                <Home language={language} />
            )}
        </div>
    );
}

export default App;