import axios from "axios";
import Path from "../path.service.ts";
import {ApiError} from "../error.service.ts";
import {LearningSeries} from "./LearningSeries.ts";
import {LearningPage} from "./LearningPage.ts";

export const getLearningSeries = async (cookie:string, seriesId:string) => {
    try {
        const response = await axios.post(`${Path.API_BASE}/contentmanagement/series`,
            {
               "learningSeriesId": seriesId
            },
            {
                headers: { 'Authorization': 'Bearer ' + cookie },
            });

        const data: LearningSeries = await response.data;
        return data;
    } catch(err) {
        // @ts-ignore
        if(err.response.status == 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}

export const getLearningPages = async (cookie:string, seriesId:string) => {
    try {
        const response = await axios.post(`${Path.API_BASE}/contentmanagement/pages/byseries`,
            {
                "learningSeriesId": seriesId
            },
            {
                headers: { 'Authorization': 'Bearer ' + cookie },
            });

        const data: LearningPage[] = await response.data;
        return data;
    } catch(err) {
        // @ts-ignore
        if(err.response.status == 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}