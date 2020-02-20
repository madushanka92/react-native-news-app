
import { newsAPIKEY , API_URL } from '../../app.json';

export class Services {
    constructor() {
    }

    getService = async (service_url, bodyData) => { 
        let data = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + newsAPIKEY,
            },
            body: bodyData

        }

        return fetch(API_URL + service_url, data)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return error;
            });
    }
}