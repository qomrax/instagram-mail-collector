import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { LogService } from 'src/log/log.service';
import { AccountDto } from './account.dto';
import { LogMethod } from 'src/log/decorator/log.decorator';
import { SortMode } from 'src/common/common.dto';
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        private logService: LogService
    ) { }

    public async createOrFindAccount(username: string, populate: boolean = false): Promise<AccountEntity> {
        const account = await this.findAccount(username, populate)
        if (!account) {
            return await this.createAccount(username, populate)
        }
        return account
    }

    public async findAccounts(limit: number, page: number, sortMode: SortMode) {
        const skip = (page - 1) * limit;

        return await this.accountRepository.find({
            skip: skip,
            take: limit,
            order: {
                createdAt: sortMode
            }
        });
    }

    public async addFollowings(username: string, followings: string[]): Promise<AccountEntity> {
        const followerEntities = await Promise.all(followings.map(async follower => {
            return await this.createOrFindAccount(follower)
        }))
        const account = await this.createOrFindAccount(username)
        account.followings = [...account.followings, ...followerEntities]
        await this.accountRepository.save(account)
        return await this.accountRepository.findOne({
            where: {
                username
            },
            relations: ["followings"]
        })

    }

    public async setTrueAccountCheckStatus(username: string): Promise<AccountEntity> {
        const account = await this.createOrFindAccount(username)

        if (!account.isChecked) {
            account.isChecked = true;
            return await this.accountRepository.save(account)
        }

        return account;
    }

    public async setTrueAccountErrorStatus(username: string): Promise<AccountEntity> {
        const account = await this.createOrFindAccount(username)
        if (!account.isErrorOccured) {
            account.isErrorOccured = true;
            return await this.accountRepository.save(account)
        }
        return account;
    }

    private async findAccount(username: string, populate: boolean): Promise<AccountEntity> {
        const foundedAccount = await this.accountRepository.findOne({
            where: {
                username
            },
            relations: populate ? ["followings", "emails"] : []
        })

        return foundedAccount
    }

    private async createAccount(username: string, populate: boolean): Promise<AccountEntity> {
        const account = new AccountEntity()
        account.username = username
        const createdAccount = await this.accountRepository.save(account)

        if (populate) {
            if (!createdAccount.followings) {
                createdAccount.followings = []
            }

            if (!createdAccount.emails) {
                createdAccount.emails = []
            }
        }


        return createdAccount
    }
}
