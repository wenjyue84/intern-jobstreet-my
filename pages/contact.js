import Layout from '../components/Layout';
import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <Head>
                <title>Contact Us - InternMy Malaysia</title>
                <meta name="description" content="Get in touch with the InternMy Malaysia team." />
            </Head>

            <div className="hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Get in touch with us.</p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Contact Info */}
                    <div>
                        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Get in Touch</h2>
                        <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
                            Have questions about finding an internship or posting a job?
                            Our support team is here to help you every step of the way.
                        </p>

                        <div className="glass-card" style={{ padding: '30px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📍 Office</h3>
                            <p style={{ color: 'var(--text-gray)' }}>
                                <strong>Prisma Technology Solution Sdn. Bhd.</strong><br />
                                No. 31A, Jalan Enau 2,<br />
                                Taman Teratai, 81300 Skudai,<br />
                                Johor, Malaysia
                            </p>
                        </div>

                        <div className="glass-card" style={{ padding: '30px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📧 Email</h3>
                            <p style={{ color: 'var(--text-gray)' }}>prismatechnology22@gmail.com</p>
                        </div>

                        <div className="glass-card" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📞 Phone</h3>
                            <p style={{ color: 'var(--text-gray)' }}>+60 3-1234 5678</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card" style={{ padding: '40px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="search-input"
                                    style={{ width: '100%' }}
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="search-input"
                                    style={{ width: '100%', minHeight: '150px', resize: 'vertical' }}
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
