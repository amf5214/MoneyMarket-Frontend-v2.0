import axios from "axios";

const loadUser = async (cookie:string) => {
    try {
        const response = await axios.get('/user',
            {
                headers: { 'Authorization': `Bearer ${cookie}` },
            });
        return await response.data['username'];
    } catch(err) {
        console.log(err);
        return null;
    }
}