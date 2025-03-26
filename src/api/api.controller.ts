import { Controller } from '@nestjs/common';
import { ApiService } from './api.service';
import { Get } from '@nestjs/common';
import axios from 'axios';
import { writeFileSync } from 'fs';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {

    }


    @Get('test')
    async test() {
        function write(data: any, name: string) {
            writeFileSync(`data/${new Date().getTime()}-${name}.json`, JSON.stringify(data, null, 4))
        }


        function urlParamsToJson(urlString) {
            const urlParams = new URLSearchParams(urlString);

            const result = {};

            urlParams.forEach((value, key) => {
                const decodedValue = decodeURIComponent(value);

                try {
                    result[key] = JSON.parse(decodedValue);
                } catch (e) {
                    result[key] = decodedValue;
                }
            });

            return result;
        }


        const headers = {
            "cookie": "sessionid=4869396170%3AciGHKX1gTAqG8f%3A1%3AAYe_gYJUn120zWIa_pV4qqIbmtr3PhF5Op8XZC2s-dM",
        }
        const data = ("variables=%7B%22id%22%3A%227201703963%22%2C%22render_surface%22%3A%22PROFILE%22%7D&server_timestamps=true&doc_id=28812098038405011")
        const response = await axios({ // CHANGE !!
            method: 'POST',
            url: 'https://www.instagram.com/graphql/query',
            headers,
            data,
            withCredentials: true
        });

        write({
            response: response.data,
            data, headers
        }, "followings")
    }
}
