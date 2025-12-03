import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';

export default function About() {
    return (
        <Layout>
            <SEOHead
                title="About Us - InternMy Malaysia"
                description="Learn more about Prisma Technology Solution Sdn. Bhd., the developer behind InternMy Malaysia."
                url="https://internmy.com/about"
                keywords="about internmy, prisma technology solution, internship platform malaysia, company profile"
            />

            <div className="hero">
                <div className="container">
                    <h1>About InternMy Malaysia</h1>
                    <p>Powered by Prisma Technology Solution Sdn. Bhd.</p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 20px' }}>
                {/* Platform Mission */}
                <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                        InternMy Malaysia is dedicated to bridging the gap between ambitious students and forward-thinking companies.
                        We believe that internships are more than just a requirement—they are the stepping stones to a successful career.
                    </p>
                </div>

                {/* Developer Profile */}
                <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ color: 'var(--primary-blue)', marginBottom: '30px' }}>About the Developer</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <div>
                            <h3 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Prisma Technology Solution Sdn. Bhd.</h3>
                            <p style={{ color: 'var(--text-gray)', marginBottom: '5px' }}><strong>Registration No:</strong> 202301030962 (1524885-A)</p>
                            <p style={{ color: 'var(--text-gray)', marginBottom: '5px' }}><strong>MD/MSC Status:</strong> MD/0001763</p>
                            <p style={{ color: 'var(--text-gray)', marginBottom: '20px' }}><strong>Incorporated:</strong> 9 August 2023</p>

                            <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                                Prisma Technology is a Johor-based technology company specializing in <strong>digital transformation solutions</strong> for businesses.
                                We focus on empowering industries through software design, Industry 4.0 integration, and intelligent systems.
                            </p>

                            <div className="tag" style={{ display: 'inline-block', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9' }}>
                                Appointed Digitalisation Partner under Geran Digital PMKS Madani (GDPM)
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: '15px', color: 'var(--primary-blue)' }}>Core Expertise</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--primary-blue)' }}>✓</span> Software Design & Customized Development
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--primary-blue)' }}>✓</span> Industry 4.0 Integration & IoT
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--primary-blue)' }}>✓</span> AI-Powered Chatbot Solutions
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--primary-blue)' }}>✓</span> HR & Payroll Systems
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--primary-blue)' }}>✓</span> Business & Grant Consultation
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Key Solutions Grid */}
                <h3 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-dark)' }}>Our Other Solutions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h4 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>Manufacturing & IoT</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                            Real-time monitoring systems including Injection Machine Counters, Water Level Monitoring, and Digital Weighing Systems integrated with MES.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h4 style={{ color: 'var(--primary-red)', marginBottom: '15px' }}>HR & Payroll</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                            Automated payroll calculation software fully compliant with LHDN requirements, generating CP22, CP21, and CP22A reports.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: '30px' }}>
                        <h4 style={{ color: 'var(--primary-yellow)', marginBottom: '15px', textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>Artificial Intelligence</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                            Multilingual, knowledge-base integrated chatbots with customizable workflows for automated customer service and engagement.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
