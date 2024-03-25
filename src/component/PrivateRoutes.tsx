import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import loadUser from '../services/auth/account.service';

const PrivateRoutes = () => {
    let auth = Cookies.get("Authorization");

    useEffect(() => {
        const updateUser = async () => {
            if(auth != undefined) {
                const user = await loadUser(auth);
                auth = await user;
            }
        }

        updateUser();
    }, []);

    return(
        auth ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes