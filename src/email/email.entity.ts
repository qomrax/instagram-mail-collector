import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn } from "typeorm";
import { AccountEntity } from "./account/account.entity";


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
}