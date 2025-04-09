import { Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {

    }
}
