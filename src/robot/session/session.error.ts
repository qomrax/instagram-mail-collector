import { BadRequestException } from "@nestjs/common";
import { SessionEntity } from "./session.entity";
import { ApiProperty } from "@nestjs/swagger";


export class Schema {
    @ApiProperty({
        type: Number,
        example: 400
    })
    statusCode: number

    @ApiProperty({
        type: String,
        example: "This session already running!"
    })
    message: string

    @ApiProperty({
        type: String,
        example: "already-running"
    })
    name: string
}

export class BadRequestWithProperties extends BadRequestException {
    static schema = Schema
}



export class MultipeRunningSessionException extends BadRequestWithProperties {
    constructor() {
        super("User have already running session!", "multiple-running-session")
    }
}


export class ThisSessionAlreadyRunningException extends BadRequestWithProperties {
    constructor() {
        super("This session already running!", "already-running")
    }
}

export class ItsNotRunningException extends BadRequestWithProperties {
    constructor() {
        super("It's not running, you can't stop.", "its-not-running")
    }

    @ApiProperty({
        type: String,
        example: "It's not running, you can't stop."
    })
    message: string

    @ApiProperty({
        type: String,
        example: "its-not-running"
    })
    name: string
}

export class ClosedWithErrorException extends BadRequestWithProperties {
    constructor(sessionEntity: SessionEntity) {
        super(`This session closed with this error "${sessionEntity.error}", you can't start. Please create a new session.`, "error-occured")
    }

    @ApiProperty({
        type: String,
        example: `This session closed with this error "x", you can't start. Please create a new session.`
    })
    message: string

    @ApiProperty({
        type: String,
        example: "error-occured"
    })
    name: string
}