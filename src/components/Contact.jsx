import React, { useState } from 'react';
import supabase from '../utils/supabase';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        description: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    { email: formData.email, description: formData.description }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ email: '', description: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content glass">
                    <div className="contact-text">
                        <h3>Let's work together!</h3>
                        <p>
                            I'm currently open for new opportunities. Whether you have a question or just want to say hi,
                            feel free to reach out. I'll get back to you as soon as possible.
                        </p>
                        <div className="social-links">
                            {/* Placeholder links with simple text for now, could use icons */}
                            <a href="#" className="social-link">LinkedIn</a>
                            <a href="#" className="social-link">GitHub</a>
                            <a href="#" className="social-link">Twitter</a>
                        </div>
                    </div>
                    <div className="contact-action">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="form-input form-textarea"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && <p className="status-msg success">Message sent successfully!</p>}
                            {status === 'error' && <p className="status-msg error">Failed to send message. Please try again.</p>}
                        </form>
                    </div>
                </div>
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} Siddharth Lokhande. All rights reserved.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
