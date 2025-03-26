import { Body, Controller, Param, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Post, Get } from '@nestjs/common';
import { AccountDto } from './account.dto';
import { PaginationDto } from 'src/common/common.dto';

@Controller('account')
@ApiTags('Account')
export class AccountController {
    constructor(private accountService: AccountService) {

    }

    @Post('test')
    async test() {
        return await this.accountService.setTrueAccountErrorStatus("qraxiss")
    }

    @Post('accounts')
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of accounts'
    })
    @ApiBody({
        type: PaginationDto
    })
    async accounts(@Body() paginationDto: PaginationDto) {
        return await this.accountService.findAccounts(
            paginationDto.limit,
            paginationDto.page,
            paginationDto.sortMode
        );
    }

    @Get('account/:username')
    @ApiParam({
        name: "username",
        description: "Username of the account to retrieve"
    })
    async account(@Param() account: AccountDto) {
        return await this.accountService.createOrFindAccount(account.username)
    }
}
