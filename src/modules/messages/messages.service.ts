import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(dto: CreateMessageDto): Promise<Message> {
        const sender = await this.userRepository.findOneBy({
            id: dto.senderId,
        });
        const recipient = await this.userRepository.findOneBy({
            id: dto.recipientId,
        });

        if (!sender || !recipient) {
            throw new NotFoundException('Sender or recipient not found');
        }

        const message = this.messageRepository.create({
            content: dto.content,
            sender,
            recipient,
        });

        return this.messageRepository.save(message);
    }

    findAll(): Promise<Message[]> {
        return this.messageRepository.find({
            relations: ['sender', 'recipient'],
            order: { timestamp: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Message> {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: ['sender', 'recipient'],
        });

        if (!message) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }

        return message;
    }

    async update(id: string, dto: UpdateMessageDto): Promise<Message> {
        const message = await this.findOne(id);
        Object.assign(message, dto);
        const updatedMessage = await this.messageRepository.save(message);
        return updatedMessage;
    }

    async remove(id: string): Promise<void> {
        const result = await this.messageRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Message with id ${id} not found`);
        }
    }
}
