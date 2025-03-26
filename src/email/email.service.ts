import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailEntity } from './email.entity';
import { Repository } from 'typeorm';
import { LogService } from 'src/log/log.service';
import { AccountEntity } from './account/account.entity';
import { AccountService } from './account/account.service';
import { SortMode } from 'src/common/common.dto';

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(EmailEntity)
        private emailRepository: Repository<EmailEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        private accountService: AccountService,
        private logService: LogService
    ) { }

    private async createEmail(email: string): Promise<EmailEntity> {
        const emailEntity = new EmailEntity()
        emailEntity.email = email
        const createdEmail = await this.emailRepository.save(emailEntity)

        if (!createdEmail.accounts) {
            createdEmail.accounts = []
        }
        return createdEmail
    }

    private async createOrFindEmail(email: string): Promise<EmailEntity> {
        const emailEntity = await this.findEmail(email);

        if (!emailEntity) {
            return this.createEmail(email);
        }

        return emailEntity;
    }

    public async findEmail(email: string): Promise<EmailEntity> {
        const emailEntity = await this.emailRepository.findOne({
            where: {
                email
            },
            relations: ["accounts"]
        })

        return emailEntity
    }

    private async linkEmailWithAccount(emailEntity: EmailEntity, accountUsername: string): Promise<EmailEntity> {
        const accountEntity = await this.accountService.createOrFindAccount(accountUsername)

        const accountExists = emailEntity.accounts.some(account => account.id === accountEntity.id)

        if (!accountExists) {
            emailEntity.accounts = [accountEntity, ...emailEntity.accounts]
        }

        const savedEmailEntity = await this.emailRepository.save(emailEntity)
        return savedEmailEntity
    }

    public async addEmail(email: string, accountUsername: string): Promise<EmailEntity> {
        const emailEntity = await this.createOrFindEmail(email)
        const linkedEmailEntity = await this.linkEmailWithAccount(emailEntity, accountUsername)
        return linkedEmailEntity
    }

    public async addEmails(emails: string[], accountUsername: string): Promise<EmailEntity[]> {
        return await Promise.all(emails.map(async email => {
            return await this.addEmail(email, accountUsername)
        }))
    }

    public async findEmails(limit: number, page: number, sortMode: SortMode) {
        const skip = (page - 1) * limit;

        return await this.emailRepository.find({
            skip: skip,
            take: limit,
            order: {
                createdAt: sortMode
            }
        });
    }

}
