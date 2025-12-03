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
                const formattedUser = formatUser(session.user);
                setUser(formattedUser);

                // Redirect to onboarding if no role (and not already there)
                if (!formattedUser.role && router.pathname !== '/onboarding') {
                    router.push('/onboarding');
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        getSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const formattedUser = formatUser(session.user);
                setUser(formattedUser);

                // Redirect to onboarding if no role (and not already there)
                if (!formattedUser.role && router.pathname !== '/onboarding') {
                    router.push('/onboarding');
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [router.pathname]);

    const formatUser = (supabaseUser) => {
        return {
            ...supabaseUser,
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.name,
            role: supabaseUser.user_metadata?.role,
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

    const changeUserRole = async (role) => {
        if (!user) return { success: false, error: 'No user logged in' };

        const { data, error } = await supabase.auth.updateUser({
            data: { role: role }
        });

        if (error) {
            console.error('Update role error:', error.message);
            return { success: false, error: error.message };
        }

        // Update local state
        setUser(formatUser(data.user));
        return { success: true, data };
    };

    const loginWithGoogle = async (role = null) => {
        const options = {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${window.location.origin}/`,
        };

        // Only pass role if explicitly provided (e.g. from Signup page)
        // Otherwise, leave it null so we can detect new users in Onboarding
        if (role) {
            options.data = { role };
        }

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: options,
        });

        console.log('Google login redirect URL:', `${window.location.origin}/`);

        if (error) {
            console.error('Google login error:', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, changeUserRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
