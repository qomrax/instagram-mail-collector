import { Controller, Param, Post } from '@nestjs/common';
import { RobotService } from './robot.service';
import { JwtAuth } from 'src/auth/decorators/jwt.decorator';
import { GetUser } from 'src/user/decorators/get-user-id.decorator';
import { UserEntity } from 'src/user/user.entity';
import { SessionEntity } from './session/session.entity';
import { ApiBadRequestResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SessionPipe } from './session/session.pipe';
import { SessionDto } from './session/session.dto';
import { ClosedWithErrorException, ItsNotRunningException, MultipeRunningSessionException, ThisSessionAlreadyRunningException } from './session/session.error';

@Controller('robot')
export class RobotController {
    constructor(private robotService: RobotService) {
    }

    @JwtAuth()
    @Post("start-session/:sessionId")
    @ApiParam({
        name: "sessionId",
        type: Number
    })
    @ApiResponse({
        type: SessionDto
    })
    @ApiBadRequestResponse({
        type: MultipeRunningSessionException,
    })
    @ApiBadRequestResponse({})
    @ApiBadRequestResponse({
        type: ClosedWithErrorException
    })
    @ApiBadRequestResponse({
        type: ThisSessionAlreadyRunningException
    })
    async startSession(@GetUser() userEntity: UserEntity, @Param('sessionId', SessionPipe) sessionEntity: SessionEntity) {
        return await this.robotService.startSession(userEntity, sessionEntity)
    }


    @JwtAuth()
    @Post("create-session/:sessionId")
    @ApiParam({
        name: "sessionId",
        type: Number
    })
    @ApiResponse({
        type: SessionDto
    })
    async createSession(@GetUser() userEntity: UserEntity) {
        return await this.robotService.createSession(userEntity)
    }

    @JwtAuth()
    @Post("stop-session/:sessionId")
    @ApiParam({
        name: "sessionId",
        type: Number
    })
    @ApiResponse({
        type: SessionDto
    })
    @ApiBadRequestResponse({
        type: ItsNotRunningException
    })
    async stopSession(@Param('sessionId', SessionPipe) sessionEntity: SessionEntity) {
        return await this.robotService.stopSession(sessionEntity)
    }



}
