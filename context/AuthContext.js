import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on initial load for current session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        console.log('Attempting login with:', email);

        // Retrieve all registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            console.log('Login successful, setting user:', foundUser);
            // Don't store password in current user session
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            return true;
        }

        console.log('Login failed: invalid credentials');
        return false;
    };

    const signup = (name, email, password, role) => {
        // Retrieve all registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user already exists
        if (users.some(u => u.email === email)) {
            console.log('Signup failed: User already exists');
            return false;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, never store plain text passwords!
            role // 'student' or 'employer'
        };

        // Save to users list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Set as current user
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
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
