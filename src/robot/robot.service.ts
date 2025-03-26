import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class RobotService {
    constructor(private emailService: EmailService, private apiService: ApiService) { }


}
