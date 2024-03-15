import axios from "axios";
import Paths from "./paths.service";

export const loadUser = async (cookie:string) => {
    try {
        const response = await axios.get(`${Paths.API_BASE}/user`,
            {
                headers: { 'Authorization': `Bearer ${cookie}` },
            });
        return await response.data['username'];
    } catch(err) {
        console.log(err);
        return null;
    }
}