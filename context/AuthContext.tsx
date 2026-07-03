import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { API_URL } from "../constants";

type User = {
    name: string | null;
    email: string;
}

type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    register: (name: string, email: string, password: string) => Promise<{ success?: boolean, message?: string }>;
    login: (email: string, password: string) => Promise<{ success?: boolean, message?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadStoreAuth();
    }, [])

    const loadStoreAuth = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setToken(token)
            setUser(user);
            return { success: true }
        } catch (err: any) {
            console.log(err, 'Something went wrong');
            return { success: false, message: err.response.data.message || "Registration failed" }
        }
    }

    const login = async (email: string, password: string) => {
        console.log(email, password, 'ppppppppppppppp')
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setToken(token)
            setUser(user);
            return { success: true }
        } catch (err: any) {
            console.log(err, 'Something went wrong');
            return { success: false, message: err.response.data.message || "Registration failed" }
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, register, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('UseAuth must be within auth provider');
    return context;
}