import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        console.log('Attempting login with:', email, password);
        // Mock login logic
        if (email && password) {
            const mockUser = {
                name: email.split('@')[0], // Use part of email as name
                email: email,
                role: 'student' // Default to student for now
            };
            console.log('Login successful, setting user:', mockUser);
            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            return true;
        }
        console.log('Login failed: missing email or password');
        return false;
    };

    const signup = (name, email, password, role) => {
        // Mock signup logic
        const mockUser = {
            name: name,
            email: email,
            role: role
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
