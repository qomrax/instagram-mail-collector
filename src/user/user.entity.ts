import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity("User")
@Unique(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;
}