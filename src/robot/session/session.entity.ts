import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { AccountEntity } from "src/email/account/account.entity";
import { EmailEntity } from "src/email/email.entity";
import { SessionStatusENUM } from "./session.enum";

@Entity("Session")
export class SessionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.sessions)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @ManyToMany(() => AccountEntity, account => account.sessions)
    @JoinTable()
    accounts: AccountEntity[]

    @ManyToMany(() => EmailEntity, email => email.sessions)
    @JoinTable()
    emails: EmailEntity[]

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: String, default: "CREATED" })
    private _status: string = "CREATED";

    get status(): string {
        return this._status;
    }

    set status(newStatus: string) {
        console.log(`Session ${this.id} status changed: ${this._status} → ${newStatus}`);
        this._status = newStatus;
    }

    @Column({ type: String, nullable: true })
    error: string

    get isRunning() {
        return this.status === SessionStatusENUM.RUNNING
    }

    get isErrorOccured() {
        return this.status === SessionStatusENUM.ERROR
    }
}

