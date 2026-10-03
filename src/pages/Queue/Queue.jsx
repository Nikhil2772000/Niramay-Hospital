import React, { useState, useEffect } from 'react';
import './Queue.css';

function Queue({ language }) {
    // लाईव्ह क्यु (Queue) डेटासाठी स्टेट (हा डेटा बॅकएंड API मधूनही फेच करू शकता)
    const [queueData, setQueueData] = useState({
        currentToken: 105,
        totalWaiting: 4,
        doctorName: 'Dr. Sudeep Deshpande',
        department: 'Cardiology'
    });

    const [loading, setLoading] = useState(false);

    // बॅकएंडवरून लाईव्ह डेटा आणण्यासाठी (जर API तयार असेल तर)
    const fetchQueueStatus = async () => {
        try {
            setLoading(true);
            // NOTE: Tumchi C# ASP.NET Core Queue API link ithe taka
            const response = await fetch('https://localhost:7131/api/Appointments/by-date');
            if (response.ok) {
                const data = await response.json();
                setQueueData(data);
            }
        } catch (err) {
            console.error('Failed to fetch queue data from backend', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // दर १० सेकंदांनी डेटा रिफ्रेश करण्यासाठी (Auto-refresh)
        const interval = setInterval(() => {
            fetchQueueStatus();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="queue-page-container">
            <div className="queue-card">
                <h2>{language === 'en' ? 'Live Patient Queue' : 'सध्याची लाईव्ह रांग (क्यु)'}</h2>
                <p>{language === 'en' ? 'Niramay Hospital - Real-Time Token Tracking' : 'निरामय हॉस्पिटल - रिअल-टाइम टोकन ट्रॅकिंग'}</p>

                <div className="current-token-box">
                    <span className="token-label">
                        {language === 'en' ? 'Current Serving Token' : 'सध्या चालू असलेला टोकन नंबर'}
                    </span>
                    <h1 className="token-number">#{queueData.currentToken}</h1>
                </div>

                <div className="queue-info-grid">
                    <div className="info-item">
                        <span className="label">{language === 'en' ? 'Active Doctor:' : 'सक्रिय डॉक्टर:'}</span>
                        <span className="value">{queueData.doctorName}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">{language === 'en' ? 'Department:' : 'विभाग:'}</span>
                        <span className="value">{queueData.department}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">{language === 'en' ? 'Patients Waiting:' : 'प्रतीक्षेत असलेले रुग्ण:'}</span>
                        <span className="value highlight">{queueData.totalWaiting}</span>
                    </div>
                </div>

                <button className="refresh-btn" onClick={fetchQueueStatus} disabled={loading}>
                    {loading 
                        ? (language === 'en' ? 'Updating...' : 'अपडेट होत आहे...') 
                        : (language === 'en' ? 'Refresh Queue Status' : 'स्टेटस रिफ्रेश करा')}
                </button>
            </div>
        </div>
    );
}

export default Queue;