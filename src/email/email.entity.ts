import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { AccountEntity } from "./account/account.entity";
import { SessionEntity } from "src/robot/session/session.entity";

@Entity("Email")
export class EmailEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: String
    })
    email: string;

    @ManyToMany(() => AccountEntity, (account => account.emails))
    accounts: AccountEntity[]


    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => SessionEntity, session => session.emails)
    sessions: SessionEntity[]
}