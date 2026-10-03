import React, { useState } from 'react';
import './Appointment.css';

function AppointmentPage({ language }) {
    const [formData, setFormData] = useState({
        patientName: '',
        email: '',
        phone: '',
        department: 'Cardiology',
        appointmentDate: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const API_URL = 'https://localhost:7131/api/Appointments'; 

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit appointment');
            }
            
            setMessage(
                language === 'en' 
                    ? 'Appointment booked successfully! Confirmation email has been triggered.' 
                    : 'अपॉइंटमेंट यशस्वीरित्या बुक झाली! कन्फर्मेशन ईमेल पाठवण्यात आला आहे.'
            );
            
            // Form reset
            setFormData({
                patientName: '',
                email: '',
                phone: '',
                department: 'Cardiology',
                appointmentDate: ''
            });
        } catch (err) {
            setError(
                language === 'en' 
                    ? 'Failed to connect to backend server. Please check your API URL.' 
                    : 'बॅकएंड सर्व्हरशी कनेक्ट करण्यात अपयश आले. कृपया API लिंक तपासा.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointment-page-container">
            <div className="appointment-card">
                <h2>{language === 'en' ? 'Book Patient Appointment' : 'रुग्ण अपॉइंटमेंट बुक करा'}</h2>
                <p>{language === 'en' ? 'Niramay Hospital - Live Queue & Care System' : 'निरामय हॉस्पिटल - लाईव्ह रांग आणि आरोग्य सेवा'}</p>
                
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>{language === 'en' ? 'Patient Full Name' : 'रुग्णाचे पूर्ण नाव'}</label>
                        <input 
                            type="text" 
                            name="patientName" 
                            value={formData.patientName} 
                            onChange={handleChange} 
                            required 
                            placeholder={language === 'en' ? 'Enter patient full name' : 'रुग्णाचे पूर्ण नाव प्रविष्ट करा'}
                        />
                    </div>

                    <div className="input-group">
                        <label>{language === 'en' ? 'Email Address (For Notification)' : 'ईमेल पत्ता (नोटिफिकेशनसाठी)'}</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            placeholder={language === 'en' ? 'Enter email address' : 'ईमेल पत्ता प्रविष्ट करा'}
                        />
                    </div>

                    <div className="input-group">
                        <label>{language === 'en' ? 'Phone Number' : 'मोबाईल नंबर'}</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            placeholder={language === 'en' ? 'Enter phone number' : 'मोबाईल नंबर प्रविष्ट करा'}
                        />
                    </div>

                    <div className="input-group">
                        <label>{language === 'en' ? 'Select Department / Doctor' : 'विभाग / डॉक्टर निवडा'}</label>
                        <select name="department" value={formData.department} onChange={handleChange}>
                            <option value="Cardiology">
                                {language === 'en' ? 'Dr. Sudeep Deshpande (Cardiology)' : 'डॉ. सुदीप देशपांडे (कार्डिओलॉजी)'}
                            </option>
                            <option value="Ayurveda">
                                {language === 'en' ? 'Dr. Supriya Deshpande (Ayurveda)' : 'डॉ. सुप्रिया देशपांडे (आयुर्वेद)'}
                            </option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>{language === 'en' ? 'Appointment Date & Time' : 'अपॉइंटमेंटची तारीख आणि वेळ'}</label>
                        <input 
                            type="datetime-local" 
                            name="appointmentDate" 
                            value={formData.appointmentDate} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading 
                            ? (language === 'en' ? 'Submitting to Backend...' : 'सबमिट होत आहे...') 
                            : (language === 'en' ? 'Confirm Appointment' : 'अपॉइंटमेंट कन्फर्म करा')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentPage;