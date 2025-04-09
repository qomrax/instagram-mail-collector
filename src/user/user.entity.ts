import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { SessionEntity } from 'src/robot/session/session.entity';

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

    @OneToMany(() => SessionEntity, session => session.user)
    sessions: SessionEntity
}