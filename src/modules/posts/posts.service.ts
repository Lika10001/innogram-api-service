import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/requests/create-post.dto';
import { UpdatePostDto } from './dto/requests/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        private readonly usersService: UsersService,
    ) {}

    async create(dto: CreatePostDto): Promise<Post> {
        const author = await this.usersService.findOne(dto.authorId);
        const post = this.postsRepository.create({
            title: dto.title,
            content: dto.content,
            imageUrls: dto.imageUrls,
            author,
        });

        return this.postsRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return this.postsRepository.find({ relations: ['author'] });
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['author', 'images'],
        });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return post;
    }

    async update(id: string, dto: UpdatePostDto): Promise<Post> {
        const post = await this.findOne(id);
        Object.assign(post, dto);
        return this.postsRepository.save(post);
    }

    async remove(id: string): Promise<void> {
        const post = await this.findOne(id);
        await this.postsRepository.remove(post);
    }
}
