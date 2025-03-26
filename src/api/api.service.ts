import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { ConstantService } from 'src/constant/constant.service';

import { InstagramUsersDto, InstagramProfileDto, InstagramUserDto, InstagramProfileDataDto } from './api.dto';
import { LogService } from 'src/log/log.service';
import { LogMethod } from 'src/log/decorator/log.decorator';
import { JobService } from 'src/log/job/job.service';

@Injectable()
export class ApiService {
    private axios: Axios;
    constructor(private envService: EnvService, private constantService: ConstantService, private logService: LogService, private jobService: JobService) {
        this.axios = axios.create({
            baseURL: 'https://social-api4.p.rapidapi.com/v1',
            headers: {
                'x-rapidapi-key': this.envService.envConfig.RAPID_API_KEY,
                'x-rapidapi-host': 'social-api4.p.rapidapi.com'
            }
        })
    }

    // private async runJob() {
    //     await this.jobService.runWithNewCorrelation('FetchFollowings', async () => {
    //         await this.logService.logBackgroundJob('FetchFollowings');

    //         const res = this.followings("qraxiss");
    //         res.then(() => { }).catch(() => { })
    //         await res;
    //     });
    // }


    private async request(path: string, args: any) {
        try {
            return await this.axios.get(path, args)
        } catch (error) {
            if (error instanceof AxiosError) {
                //@ts-ignore 
                const simplifiedError = AxiosError(error.message, error.code, {
                    url: error.config.url
                })

                await this.logService.logMethodEntry("ApiService", "request", simplifiedError)

                if (error.code === "500") {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return await this.request(path, args)
                }

                if (error.code === "429") {
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    return await this.request(path, args)
                }

                throw simplifiedError

            } else {
                throw error
            }
        }
    }

    private async fetchProfileInfo(username: string): Promise<InstagramProfileDto> {
        const response: AxiosResponse<InstagramProfileDto> = await this.request(`/info`, {
            params: {
                username_or_id_or_url: username
            }
        })

        return response.data
    }

    private async fetchFollowings(username: string): Promise<InstagramUsersDto> {
        const response: AxiosResponse<InstagramUsersDto> = await this.request(`/following`, {
            params: {
                username_or_id_or_url: username,
                amount: this.constantService.FETCH_FOLLOWER_AMOUNT
            }
        })

        return response.data
    }

    private mapInstagramUsersDto(data: InstagramUsersDto) {
        const users: InstagramUserDto[] = data.data.items

        return users.map((user: InstagramUserDto) => ({
            isVerified: user.is_verified,
            isPrivate: user.is_private,
            username: user.username,
        }))
    }

    private mapInstagramProfileDto(data: InstagramProfileDto) {
        const account: InstagramProfileDataDto = data.data
        return {
            username: account.username,
            emails: this.emails(account)
        }
    }

    private emails(instagramProfileData: InstagramProfileDataDto): string[] {
        const emails: string[] = []
        if (instagramProfileData.public_email) {
            emails.push(instagramProfileData.public_email)
        }

        const biographyEmails = this.extractEmails(instagramProfileData.biography)

        for (const email of biographyEmails) {
            if (!emails.includes(email)) {
                emails.push(email)
            }
        }

        return emails
    }

    private extractEmails(text: string): string[] {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || [];
    }

    @LogMethod()
    public async profileInfo(username: string) {
        return this.mapInstagramProfileDto(await this.fetchProfileInfo(username))
    }

    @LogMethod()
    public async followings(username: string) {
        return this.mapInstagramUsersDto(await this.fetchFollowings(username))
    }
}

