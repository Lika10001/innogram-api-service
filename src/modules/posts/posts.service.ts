import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const author = await this.usersRepository.findOneBy({
            id: createPostDto.authorId,
        });
        if (!author) {
            throw new NotFoundException(
                `User with id ${createPostDto.authorId} not found`,
            );
        }

        const post = this.postsRepository.create({
            title: createPostDto.title,
            content: createPostDto.content,
            imageUrls: createPostDto.imageUrl,
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
            relations: ['author'],
        });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = await this.findOne(id);

        if (updatePostDto.authorId) {
            const author = await this.usersRepository.findOneBy({
                id: updatePostDto.authorId,
            });
            if (!author) {
                throw new NotFoundException(
                    `User with id ${updatePostDto.authorId} not found`,
                );
            }
            post.author = author;
        }

        Object.assign(post, updatePostDto);
        return this.postsRepository.save(post);
    }

    async remove(id: string): Promise<void> {
        const post = await this.findOne(id);
        await this.postsRepository.remove(post);
    }
}
