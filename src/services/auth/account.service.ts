import axios from "axios";
import Path from "../path.service";

const loadUser = async (cookie:string) => {
    try {
        const response = await axios.get(`${Path.API_BASE}/user`,
            {
                headers: { 'Authorization': `Bearer ${cookie}` },
            });
        return await response.data;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export default loadUser;