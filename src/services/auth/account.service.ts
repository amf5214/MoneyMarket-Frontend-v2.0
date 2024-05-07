import axios from "axios";
import Path from "../path.service";
import { ApiError } from "../error.service";

const loadUser = async (cookie:string) => {
    try {
        const response = await axios.get(`${Path.API_BASE}/user`,
            {
                headers: { 'Authorization': `Bearer ${cookie}` },
            });
        return await response.data;
    } catch(err) {
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
        return null;
    }
}

export const loadProfile = async (cookie:string) => {
    try {
        const response = await axios.get(`${Path.API_BASE}/profile`,
            {
                headers: { 'Authorization': `Bearer ${cookie}` },
            });
        return await response.data;
    } catch(err) {
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
        return null;
    }
}

export const updateProfile = async (cookie:string, education:string, location:string) => {
    try {
        const response = await axios.patch(`${Path.API_BASE}/profile/update`,
            JSON.stringify({education: education, citystate: location}),
            { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                },
            });
        return await response;
    } catch(err) {
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
        return null;
    }
}

export const checkSubscriptionStatus = async (cookie:string) => {
    try {
        const response = await axios.get(`${Path.API_BASE}/payment/verify-subscription`,
            { headers: {
                    'Authorization': `Bearer ${cookie}`
                },
            });
        return response.status == 200;
    } catch(err) {
        // @ts-ignore
        if(err.response.status === 500) {
            return false;
        }
        return null;
    }
}


export default loadUser;