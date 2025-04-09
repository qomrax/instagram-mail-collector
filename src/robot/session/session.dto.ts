import { ApiProperty } from "@nestjs/swagger";
import { SessionStatusENUM } from "./session.enum";

export class SessionDto {
    @ApiProperty({
        type: Number
    })
    id: number

    @ApiProperty({
        type: Date
    })
    createdAt: Date

    @ApiProperty({
        // enumName: "STATUS", type: SessionStatusENUM
    })
    status: SessionStatusENUM

    @ApiProperty({
        type: String,
        required: false
    })
    error?: string
}