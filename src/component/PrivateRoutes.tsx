import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import loadUser from '../services/auth/account.service';
import { ApiError } from '../services/error.service';

const PrivateRoutes = () => {
    let auth = Cookies.get("Authorization");

    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = async () => {
            if(auth != undefined) {
                const user = await loadUser(auth);
                setUser(await user);
            }
        }

        updateUser();
    }, []);

    return(
        <>
            { auth && user != ApiError.UNAUTHORIZED ? <Outlet/> : <Navigate to="/signin"/> }
        </>
    )
}

export default PrivateRoutes