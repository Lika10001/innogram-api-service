import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        private readonly usersService: UsersService,
    ) {}

    async create(dto: CreateMessageDto): Promise<Message> {
        const sender = await this.usersService.findOne(dto.senderId);
        const recipient = await this.usersService.findOne(dto.recipientId);

        if (sender === recipient) {
            throw new NotFoundException(
                `Sender and recipient cannot be the same user`,
            );
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
            order: { createdAt: 'DESC' },
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
