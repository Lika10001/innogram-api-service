import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async create(createCommentDto: CreateCommentDto) {
        const { userId, postId, text, parentId } = createCommentDto;

        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const post = await this.postsRepository.findOneBy({ id: postId });
        if (!post) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }

        let parentComment: Comment | null = null;
        if (parentId) {
            parentComment = await this.commentsRepository.findOneBy({
                id: parentId,
            });
            if (!parentComment) {
                throw new NotFoundException(
                    `Parent comment with id ${parentId} not found`,
                );
            }
        }

        const comment = this.commentsRepository.create({
            text,
            author: user,
            post: post,
            parent: parentComment,
        });

        return this.commentsRepository.save(comment);
    }

    async findAll(postId: string): Promise<CommentResponseDto[]> {
        const post = await this.postsRepository.findOneBy({ id: postId });
        if (!post) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }

        const comments = await this.commentsRepository.find({
            where: { post: post },
            relations: ['author'],
        });

        return comments.map((comment) => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            author: {
                id: comment.author.id,
                name: comment.author.name,
            },
            childrenCount: comment.children ? comment.children.length : 0,
        }));
    }

    async findOne(id: string): Promise<CommentResponseDto> {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['author', 'children'],
        });

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return {
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            author: {
                id: comment.author.id,
                name: comment.author.name,
            },
            childrenCount: comment.children ? comment.children.length : 0,
        };
    }

    async update(
        id: string,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        const comment = await this.commentsRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        comment.text = updateCommentDto.text;
        return this.commentsRepository.save(comment);
    }

    async remove(id: string): Promise<void> {
        const comment = await this.commentsRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        await this.commentsRepository.remove(comment);
    }
}
