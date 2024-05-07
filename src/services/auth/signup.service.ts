import axios from "axios";
import Path from "../path.service";
import { ApiError } from "../error.service";

export const handleSignUp = async (firstName:string, lastName:string, email:string, password:string, username:string) => {
    try {
        await axios.post(`${Path.API_BASE}/auth/signup`,
        JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            username:username,
        }),
        {
            headers: {'Content-Type': 'application/json'},
        });

        return "successful";

    } catch(err) {
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
        return null;
    }
}