import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: number, updateUser: Partial<UserEntity>): Promise<UserEntity> {
        await this.userRepository.update(id, updateUser);
        return this.userRepository.findOne({ where: { id: id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}