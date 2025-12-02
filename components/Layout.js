import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <footer style={{ background: '#1a1a1a', color: 'white', padding: '40px 0', marginTop: '60px' }}>
                <div className="container" style={{ textAlign: 'center', opacity: 0.7 }}>
                    <p>&copy; 2024 InternMy Malaysia. Helping students find their path.</p>
                </div>
            </footer>
        </>
    );
}
