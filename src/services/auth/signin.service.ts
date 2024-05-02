import { ApiError } from "../error.service";
import Path from "../path.service";
import axios from "axios";

export const handleSignin = async (email:string, pwd:string) => {
    try {
        const response = await axios.post(`${Path.API_BASE}/auth/signin`,
        JSON.stringify({email:email, password:pwd}),
        {
            headers: {'Content-Type': 'application/json'},
        });

        return await response.data['access_token'];

    } catch(err) {
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
        return null;
    }
}