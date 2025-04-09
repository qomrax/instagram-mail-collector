import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, JoinColumn } from "typeorm";
import { EmailEntity } from "../email.entity";
import { SessionEntity } from "src/robot/session/session.entity";
@Entity("Account")
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        default: false
    })
    isChecked: boolean;

    @Column({
        default: false
    })
    isErrorOccured: boolean;

    @ManyToMany(() => EmailEntity, mail => mail.accounts)
    @JoinTable()
    emails: EmailEntity[];

    @ManyToMany(() => AccountEntity)
    @JoinTable()
    followings: AccountEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => SessionEntity, session => session.accounts)
    sessions: SessionEntity[]
}
