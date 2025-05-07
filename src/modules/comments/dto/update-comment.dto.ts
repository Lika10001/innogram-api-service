import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsNotEmpty()
    @Length(1, 255)
    text: string;
}
