import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService,
    ) {}

    async create(dto: CreateLikeDto): Promise<Like> {
        const user = await this.usersService.findOne(dto.userId);
        const post = await this.postsService.findOne(dto.postId);

        if (post.author.id === user.id) {
            throw new Error('User cannot like their own post');
        }

        const existingLike = await this.likesRepository.findOne({
            where: {
                user: { id: dto.userId },
                post: { id: dto.postId },
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
