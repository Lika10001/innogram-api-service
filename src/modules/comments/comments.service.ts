import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentResponseDto } from './dto/responses/comment-response.dto';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService,
    ) {}

    private mapComment(comment: Comment): CommentResponseDto {
        return {
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            author: {
                id: comment.author.id,
                name: comment.author.name,
            },
            children:
                comment.children?.map((child) => this.mapComment(child)) ?? [],
        };
    }

    async create(dto: CreateCommentDto) {
        const { userId, postId, text, parentId } = dto;

        const user = await this.usersService.findOne(userId);
        const post = await this.postsService.findOne(postId);

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

    async findAll(postId?: string): Promise<CommentResponseDto[]> {
        let comments: Comment[] = [];
        if (postId) {
            const post = await this.postsService.findOne(postId);
            comments = await this.commentsRepository.find({
                where: { post: post },
                relations: ['author', 'children', 'children.author'],
            });
        }
        comments = await this.commentsRepository.find({
            relations: ['author', 'post', 'children', 'children.author'],
        });

        return comments.map((comment) => this.mapComment(comment));
    }

    async findOne(id: string): Promise<CommentResponseDto> {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['author', 'children'],
        });

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return this.mapComment(comment);
    }

    async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentsRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        comment.text = dto.text;
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
