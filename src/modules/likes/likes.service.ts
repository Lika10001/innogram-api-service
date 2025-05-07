import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async create(createLikeDto: CreateLikeDto): Promise<Like> {
        const user = await this.usersRepository.findOneBy({
            id: createLikeDto.userId,
        });
        if (!user) {
            throw new Error(`User with id ${createLikeDto.userId} not found`);
        }

        const post = await this.postsRepository.findOneBy({
            id: createLikeDto.postId,
        });
        if (!post) {
            throw new Error(`Post with id ${createLikeDto.postId} not found`);
        }

        if (post.author.id === user.id) {
            throw new Error('User cannot like their own post');
        }

        const existingLike = await this.likesRepository.findOne({
            where: {
                user: { id: createLikeDto.userId },
                post: { id: createLikeDto.postId },
            },
        });

        if (existingLike) {
            throw new Error('User has already liked the post');
        }

        const like = this.likesRepository.create({ user, post });
        return this.likesRepository.save(like);
    }

    async findAll(): Promise<Like[]> {
        return this.likesRepository.find();
    }

    async findOne(id: string): Promise<Like> {
        const like = await this.likesRepository.findOneBy({ id });
        if (!like) {
            throw new Error(`Like with id ${id} not found`);
        }
        return like;
    }

    async remove(id: string): Promise<void> {
        const like = await this.findOne(id);
        await this.likesRepository.remove(like);
    }
}
