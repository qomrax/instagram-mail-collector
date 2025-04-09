import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { EmailEntity } from 'src/email/email.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/email/account/account.entity';
import { UserEntity } from 'src/user/user.entity';
import { SessionStatusENUM } from './session.enum';
import { ClosedWithErrorException, ItsNotRunningException, MultipeRunningSessionException, ThisSessionAlreadyRunningException } from './session.error';
@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private sessionRepository: Repository<SessionEntity>,
    ) {
    }

    public async createSession(userEntity: UserEntity) {
        const sessionEntity = new SessionEntity()
        sessionEntity.user = userEntity;
        return await this.sessionRepository.save(sessionEntity);
    }

    public async linkEmails(sessionEntity: SessionEntity, emailEntities: EmailEntity[]) {
        sessionEntity.emails = [...sessionEntity.emails, ...emailEntities]
        const linkedSessionEntity = await this.sessionRepository.save(sessionEntity)
        return linkedSessionEntity
    }

    public async linkFollowers(sessionEntity: SessionEntity, accountEntities: AccountEntity[]) {
        sessionEntity.accounts = [...sessionEntity.accounts, ...accountEntities]
        const linkedSessionEntity = await this.sessionRepository.save(sessionEntity)
        return linkedSessionEntity
    }

    private async changeSessionStatus(sessionEntity: SessionEntity, status: SessionStatusENUM): Promise<SessionEntity> {
        sessionEntity.status = status
        const updatedSessionEntity = await this.sessionRepository.save(sessionEntity)
        return updatedSessionEntity;
    }

    public async startSession(userEntity: UserEntity, sessionEntity: SessionEntity): Promise<SessionEntity> {
        if (sessionEntity.isRunning) {
            throw new ThisSessionAlreadyRunningException()
        }

        if (sessionEntity.isErrorOccured) {
            throw new ClosedWithErrorException(sessionEntity)
        }

        const userSessionEntities = await this.sessionRepository.find({
            relations: ["user"],
            where: {
                user: userEntity
            }
        })

        const runningUserSessionEntity = userSessionEntities.find((userSessionEntity: SessionEntity) => userSessionEntity.isRunning)
        if (runningUserSessionEntity) {
            throw new MultipeRunningSessionException()
        }

        return await this.changeSessionStatus(sessionEntity, SessionStatusENUM.RUNNING)
    }

    public async stopSession(sessionEntity: SessionEntity): Promise<SessionEntity> {
        if (!sessionEntity.isRunning) {
            throw new ItsNotRunningException()
        }

        return await this.changeSessionStatus(sessionEntity, SessionStatusENUM.PAUSED)
    }

    public async findSession(sessionId: number): Promise<SessionEntity> {
        return await this.sessionRepository.findOne({
            where: {
                id: sessionId
            }
        })
    }
}

