
import axios from "axios";

export class ApiServices {
    public static get() {
        const url: any = "https://stage.maapay.io/api/company"
        return axios
            .get(`${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "Application/JSON"
                },
            })
            .then((response: any) => {
                return response;
            });
    }
    public static post(url: any, data: any) {
        return axios
            .post(`${url}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "Application/JSON",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            })
            .then((response: any) => {
                return response;
            });
    }

    public static patch(endPoint: any, data: any) {
        const url: any = `https://stage.maapay.io/api/company/${endPoint}`
        return axios
            .put(`${url}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response: any) => {
                return response;
            });
    }
}
