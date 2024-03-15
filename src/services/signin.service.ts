import Paths from "./paths.service";
import axios from "axios";

export const handleSignin = async (email:string, pwd:string) => {
    try {
        const response = await axios.post(`${Paths.API_BASE}/auth/signin`,
        JSON.stringify({email:email, password:pwd}),
        {
            headers: {'Content-Type': 'application/json'},
        });

        return await response.data['access_token'];

    } catch(err) {
        console.log(err)
        return null;
    }
}