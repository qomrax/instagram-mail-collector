import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;
}