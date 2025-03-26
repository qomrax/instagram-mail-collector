import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { PaginationDto } from 'src/common/common.dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailDto } from './email.dto';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {

    }


    @Post('test')
    async test() {
        return await this.emailService.addEmail("31@gmail.com", "fatih")
    }

    @Post('emails')
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of emails'
    })
    @ApiBody({
        type: PaginationDto
    })
    async emails(@Body() paginationDto: PaginationDto) {
        return await this.emailService.findEmails(paginationDto.limit, paginationDto.page, paginationDto.sortMode)
    }

    @Post('email')
    @ApiResponse({
        status: 200,
    })
    @ApiBody({
        type: EmailDto
    })
    async email(@Body() emailDto: EmailDto) {
        return await this.emailService.findEmail(emailDto.email)
    }


}
