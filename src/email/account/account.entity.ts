import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { EmailEntity } from "../email.entity";

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
}
