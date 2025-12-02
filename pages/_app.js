import '../styles/globals.css'
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Head>
                <link rel="icon" href="/favicon.png" />
                <title>Intern JobStreet</title>
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
