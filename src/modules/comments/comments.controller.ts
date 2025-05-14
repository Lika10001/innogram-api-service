import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/requests/create-comment.dto';
import { UpdateCommentDto } from './dto/requests/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentResponseDto } from './dto/responses/comment-response.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    findAll(@Query('postId') postId?: string): Promise<CommentResponseDto[]> {
        return this.commentsService.findAll(postId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CommentResponseDto> {
        return this.commentsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.commentsService.remove(id);
    }
}
