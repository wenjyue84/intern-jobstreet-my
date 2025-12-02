import Navbar from './Navbar';
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <footer style={{ background: '#1a1a1a', color: 'white', padding: '60px 0', marginTop: '60px' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link href="/about" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>About Us</Link>
                            <Link href="/contact" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Contact</Link>
                            <Link href="/privacy" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Privacy Policy</Link>
                        </div>
                        <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
                            <p>&copy; 2024 InternMy Malaysia. Helping students find their path.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
