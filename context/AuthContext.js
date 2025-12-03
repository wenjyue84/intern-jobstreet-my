import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(formatUser(session.user));
            }
            setLoading(false);
        };

        getSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(formatUser(session.user));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const formatUser = (supabaseUser) => {
        return {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name,
            role: supabaseUser.user_metadata?.role,
            ...supabaseUser
        };
    };

    const login = async (email, password) => {
        console.log('AuthContext: login called with', email);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log('AuthContext: supabase result', { data, error });

        if (error) {
            console.error('Login error:', error.message);
            return { success: false, error: error.message };
        }
        return { success: true, data };
    };

    const signup = async (name, email, password, role) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role,
                },
            },
        });

        if (error) {
            console.error('Signup error:', error.message);
            return { success: false, error: error.message };
        }

        // If signup is successful but no session, it means email verification is required
        if (data.user && !data.session) {
            return { success: true, data, requiresVerification: true };
        }

        return { success: true, data, requiresVerification: false };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
