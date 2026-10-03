import React, { useState, useEffect } from 'react';
import './Home.css';

function Home({ language }) {
    // State for interactive chat widget popup
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: language === 'en' ? 'Hello! Welcome to Niramay Hospital. How can I help you today?' : 'नमस्कार! निरामय हॉस्पिटलमध्ये आपले स्वागत आहे. मी तुम्हाला कशी मदत करू शकतो?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    // State for Cookies Banner
    const [showCookies, setShowCookies] = useState(false);

    useEffect(() => {
        // Check if user has already accepted or declined cookies
        const cookieChoice = localStorage.getItem('niramay_cookie_consent');
        if (!cookieChoice) {
            setShowCookies(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('niramay_cookie_consent', 'accepted');
        setShowCookies(false);
    };

    const handleDeclineCookies = () => {
        localStorage.setItem('niramay_cookie_consent', 'declined');
        setShowCookies(false);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMsg = inputMessage;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputMessage('');

        // Simulate AI automated system reply based on user input
        setTimeout(() => {
            let aiReply = language === 'en' 
                ? "Thank you for your query. Our hospital is located in Pimple Saudagar, Pune. You can book an appointment or call +91 8237571026 for assistance." 
                : "तुमच्या प्रश्नाबद्दल धन्यवाद. आमचे हॉस्पिटल पिंपळे सौदागर, पुणे येथे आहे. तुम्ही अपॉइंटमेंट बुक करू शकता किंवा मदतीसाठी +91 8237571026 वर कॉल करू शकता.";

            const lower = userMsg.toLowerCase();
            if (lower.includes('timing') || lower.includes('time') || lower.includes('वेळ')) {
                aiReply = language === 'en' ? "OPD timings are 9:00 AM to 9:00 PM. Emergency services are open 24/7." : "ओपीडीची वेळ सकाळी ९ ते रात्री ९ आहे. आपत्कालीन सेवा २४/७ सुरू असतात.";
            } else if (lower.includes('appointment') || lower.includes('अपॉइंटमेंट')) {
                aiReply = language === 'en' ? "You can click on 'Book An Appointment' button above to schedule your visit." : "तुम्ही वरील 'अपॉइंटमेंट बुक करा' बटनावर क्लिक करून वेळ ठरवू शकता.";
            } else if (lower.includes('doctor') || lower.includes('डॉक्टर')) {
                aiReply = language === 'en' ? "We have 50+ expert doctors across various specialties like Pediatrics, Orthopedics, Cardiology, etc." : "आमच्याकडे बालरोग, अस्थिरोग, हृदयरोग अशा विविध विभागांमध्ये ५० हून अधिक तज्ज्ञ डॉक्टर आहेत.";
            }

            setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
        }, 1000);
    };

    return (
        <div className="home-container">
            {/* Hero Section with Clean White & Soft Transparent Overlay */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>{language === 'en' ? 'WELCOME TO NIRAMAY HOSPITAL' : 'निरामय हॉस्पिटलमध्ये आपले स्वागत आहे'}</h1>
                    <p className="hero-subtitle">
                        {language === 'en' 
                            ? 'Commitment For Premium Health Care' 
                            : 'उत्कृष्ट आणि दर्जेदार आरोग्यसेवेसाठी आमची कटिबद्धता'}
                    </p>
                    <p className="hero-description">
                        {language === 'en'
                            ? 'At Niramay Hospital, we are dedicated to providing compassionate, world-class medical care for you and your family. Our experienced team uses the latest advancements to ensure you receive the best treatment.'
                            : 'निरामय हॉस्पिटलमध्ये, आम्ही तुम्हाला आणि तुमच्या कुटुंबाला दयाळू आणि जागतिक दर्जाची वैद्यकीय सेवा देण्यासाठी समर्पित आहोत.'}
                    </p>
                    <div className="hero-btn-container">
                        <a href="/appointment" className="hero-btn">
                            {language === 'en' ? 'Book An Appointment' : 'अपॉइंटमेंट बुक करा'}
                        </a>
                    </div>
                </div>
            </section>

            {/* Three Info Cards Section */}
            <section className="info-cards-section">
                <div className="info-card blue-dark">
                    <h3>{language === 'en' ? 'Doctors' : 'डॉक्टर्स'}</h3>
                    <p>
                        {language === 'en'
                            ? 'Discover experienced specialists and renowned surgeons dedicated to providing exceptional healthcare tailored to your needs.'
                            : 'अनुभवी डॉक्टर आणि तज्ज्ञ सर्जन जे तुमच्या गरजेनुसार उत्तम आरोग्य सेवा देतात.'}
                    </p>
                    <a href="/history" className="card-action-btn">
                        {language === 'en' ? 'Find A Doctor' : 'डॉक्टर शोधा'}
                    </a>
                </div>

                <div className="info-card blue-mid">
                    <h3>{language === 'en' ? 'Appointment' : 'अपॉइंटमेंट'}</h3>
                    <p>
                        {language === 'en'
                            ? 'Easily schedule your appointment with our medical professionals. Fill out the required details to secure your visit.'
                            : 'आमच्या वैद्यकीय तज्ज्ञांसोबत सहजपणे तुमची अपॉइंटमेंट शेड्यूल करा.'}
                    </p>
                    <a href="/appointment" className="card-action-btn">
                        {language === 'en' ? 'Book An Appointment' : 'अपॉइंटमेंट बुक करा'}
                    </a>
                </div>

                <div className="info-card blue-light">
                    <h3>{language === 'en' ? 'Emergency Services' : 'आपत्कालीन सेवा'}</h3>
                    <p>
                        {language === 'en'
                            ? 'Our dedicated emergency team is available 24/7 to provide immediate medical care and support in critical situations.'
                            : 'आमची आपत्कालीन टीम २४/७ उपलब्ध आहे.'}
                    </p>
                    <p className="emergency-location">📍 {language === 'en' ? 'Pimple Saudagar, Pune' : 'पिंपळे सौदागर, पुणे'}</p>
                    <p className="emergency-phone">📞 +91 020 27405588 / +91 8237571026</p>
                    <button onClick={() => setIsChatOpen(true)} className="card-action-btn" style={{background: 'transparent', border: '2px solid #fff', cursor: 'pointer'}}>
                        {language === 'en' ? 'Chat With Us' : 'चॅट करा'}
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section className="about-preview-section">
                <div className="about-image-box">
                    <img src="/hospital-interior.jpg" alt="Hospital Interior" />
                </div>
                <div className="about-text-box">
                    <span className="section-tag">{language === 'en' ? 'About Us' : 'आमच्याबद्दल'}</span>
                    <h2>{language === 'en' ? 'NIRAMAY HOSPITAL - TRUSTED MEDICAL CARE IN PUNE' : 'निरामय हॉस्पिटल - पुण्यातील विश्वासू आरोग्य सेवा'}</h2>
                    <p>
                        {language === 'en'
                            ? 'Welcome to Niramay Hospital, a leading healthcare provider in the region. We are committed to delivering personalized and compassionate care with advanced medical technologies.'
                            : 'निरामय हॉस्पिटलमध्ये आपले स्वागत आहे. आम्ही आधुनिक तंत्रज्ञानासह वैयक्तिक आणि उत्तम आरोग्य सेवा देण्यास कटिबद्ध आहोत.'}
                    </p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
                <div className="stat-item">
                    <h3>200+</h3>
                    <p>{language === 'en' ? 'BEDS' : 'बेड्स'}</p>
                </div>
                <div className="stat-item">
                    <h3>50+</h3>
                    <p>{language === 'en' ? 'EXPERT DOCTORS' : 'तज्ज्ञ डॉक्टर्स'}</p>
                </div>
                <div className="stat-item">
                    <h3>100+</h3>
                    <p>{language === 'en' ? 'SUPPORTING STAFF' : 'कर्मचारी वर्ग'}</p>
                </div>
                <div className="stat-item">
                    <h3>25+</h3>
                    <p>{language === 'en' ? 'YEARS OF LEGACY' : 'वर्षे विश्वासार्हता'}</p>
                </div>
            </section>

            {/* Floating Chat Button */}
            <button onClick={() => setIsChatOpen(!isChatOpen)} className="floating-chat-btn">
                💬 {language === 'en' ? 'Chat with us' : 'चॅट करा'}
            </button>

            {/* Interactive AI Chat Box Popup */}
            {isChatOpen && (
                <div className="chat-popup-overlay">
                    <div className="chat-popup-container">
                        <div className="chat-popup-header">
                            <h3>{language === 'en' ? 'Niramay AI Assistant' : 'निरामय एआय असिस्टंट'}</h3>
                            <button onClick={() => setIsChatOpen(false)} className="chat-close-btn">&times;</button>
                        </div>
                        <div className="chat-popup-body">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat-bubble ${msg.sender}`}>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="chat-popup-footer">
                            <input 
                                type="text" 
                                placeholder={language === 'en' ? 'Type your query here...' : 'तुमचा प्रश्न येथे लिहा...'} 
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button type="submit">➤</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Cookies Consent Banner */}
            {showCookies && (
                <div className="cookie-banner">
                    <div className="cookie-content">
                        <p>
                            🍪 {language === 'en' 
                                ? 'We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.' 
                                : 'आम्ही आमच्या वेबसाइटवरील तुमचा अनुभव सुधारण्यासाठी कुकीज वापरतो. कुकीजच्या वापरास तुम्ही सहमती दर्शवता.'}
                        </p>
                    </div>
                    <div className="cookie-buttons">
                        <button onClick={handleDeclineCookies} className="cookie-btn decline">
                            {language === 'en' ? 'Decline' : 'नका स्वीकारू'}
                        </button>
                        <button onClick={handleAcceptCookies} className="cookie-btn accept">
                            {language === 'en' ? 'Accept' : 'स्वीकारा'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;