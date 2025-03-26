import { IsNumber, IsEnum, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export enum SortMode {
    ASC = "ASC",
    DESC = "DESC"
}

export class PaginationDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Page number',
        example: 1
    })
    page: number

    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Number of items per page',
        example: 10
    })
    limit: number

    @IsOptional()
    @IsEnum(SortMode)
    @ApiProperty({
        enum: SortMode,
        description: 'Sorting direction',
        example: SortMode.ASC,
        default: SortMode.ASC
    })
    sortMode: SortMode = SortMode.ASC
}
