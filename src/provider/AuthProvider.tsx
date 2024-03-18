import { createContext, useState, useEffect } from 'react';
import loadUser from '../services/auth/account.service';
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = async () => {
            const cookie = Cookies.get("Authorization");
            if(cookie != undefined) {
                const user = await loadUser(cookie);
                setUser(await user);
            }
        }

        updateUser();
    }, []);

    return (
        <AuthContext.Provider value = {{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;