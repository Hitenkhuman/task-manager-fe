import { useState } from 'react';
import { postRequest } from '../utils/request';
import { AUTH_ENDPOINT, LOCAL_STORAGE_USER_KEY } from '../constants';
import { RouteUrls } from '../RouteUrls';
import { User } from '../interfaces/User';
import { SignUpFormOutput } from '../pages/auth/signup/Signup';

export interface Auth {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    signup: (data: SignUpFormOutput) => Promise<User>;
}

const useAuth = (): Auth => {
    const [currentUser, setCurrentUser] = useState<User | null>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)!));

    const login = async (email: string, password: string) => {
        const response = await postRequest(AUTH_ENDPOINT.LOGIN, { email, password });
        if (response.data.accessToken) {
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));
            setCurrentUser(response.data);
        }
        return response.data;
    };

    const signup = async (data: SignUpFormOutput) => {
        const response = await postRequest(AUTH_ENDPOINT.SIGNUP, data);
        if (response.data.accessToken) {
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));
            setCurrentUser(response.data);
        }
        return response.data;
    }

    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        setCurrentUser(null);
    };

    return { currentUser, login, logout ,signup};
};

export default useAuth;