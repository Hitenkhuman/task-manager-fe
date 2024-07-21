import  { createContext, useContext } from 'react';
import  { Auth } from '../hooks/useAuth';

export const AuthContext = createContext<Auth | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
