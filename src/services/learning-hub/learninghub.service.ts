import axios from "axios";
import Path from "../path.service.ts";
import {ApiError} from "../error.service.ts";
import {LearningSeries} from "./LearningSeries.ts";

export const getLearningHub = async (cookie:string) => {
    try {
        const response = await axios.get(`${Path.API_BASE}/contentmanagement/home`,
            {
                headers: { 'Authorization': 'Bearer ' + cookie },
            });

        const data: LearningSeries[] = await response.data;
        console.log(await data);
        return data;
    } catch(err) {
        // @ts-ignore
        if(err.response.status == 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}