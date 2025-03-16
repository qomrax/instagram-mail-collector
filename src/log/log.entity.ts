import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('logs')
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    correlationId: string;

    @Column()
    level: string;

    @Column()
    serviceName: string;

    @Column()
    methodName: string;

    @Column({ type: 'text', nullable: true })
    request: string;

    @Column({ type: 'text', nullable: true })
    response: string;

    @Column({ type: 'text', nullable: true })
    error: string;

    @CreateDateColumn()
    timestamp: Date;
}