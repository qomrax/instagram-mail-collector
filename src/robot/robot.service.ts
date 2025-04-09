import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { EmailService } from 'src/email/email.service';
import { SessionService } from './session/session.service';
import { UserService } from 'src/user/user.service';
import { AccountService } from 'src/email/account/account.service';
import { EmailEntity } from 'src/email/email.entity';
import { AccountEntity } from 'src/email/account/account.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session/session.entity';
@Injectable()
export class RobotService {
    constructor(
        @InjectRepository(EmailEntity)
        private emailRepository: Repository<EmailEntity>,

        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        private emailService: EmailService,
        private accountService: AccountService,
        private userService: UserService,
        private sessionService: SessionService
    ) { }

    async createSession(userEntity: UserEntity) {
        const createdSession = await this.sessionService.createSession(userEntity)
        return createdSession
    }

    async startSession(userEntity: UserEntity, sessionEntity: SessionEntity) {
        const startedSession = await this.sessionService.startSession(userEntity, sessionEntity)
        return startedSession
    }

    async stopSession(sessionEntity: SessionEntity) {
        const stoppedSession = await this.sessionService.stopSession(sessionEntity)
        return stoppedSession
    }

    async sessions(userEntity: UserEntity) {
        const foundedSessions = await this.sessionService.sessionRepository.find({
            where: {
                user: userEntity
            }
        })
        return foundedSessions
    }

    private async addEmails(sessionEntity: SessionEntity, emails: string[], accountUsername: string) {
        const emailEntities = await this.emailService.addEmails(emails, accountUsername)
        return await this.sessionService.linkEmails(sessionEntity, emailEntities)
    }

    private async addFollowings(sessionEntity: SessionEntity, accountUsername: string, accountFollowings: string[]) {
        const accountEntity = await this.accountService.addFollowings(accountUsername, accountFollowings)
        return await this.sessionService.linkFollowers(sessionEntity, accountEntity.followings)
    }
}
