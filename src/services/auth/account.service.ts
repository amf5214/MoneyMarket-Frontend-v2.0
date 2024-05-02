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

export default loadUser;