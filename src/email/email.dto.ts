import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";


export class EmailDto {
    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string
}