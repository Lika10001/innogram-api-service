import {
    IsNotEmpty,
    IsString,
    IsUUID,
    Length,
    ValidateNested,
} from 'class-validator';
import { CommentResponseDto } from './comment-response.dto';
import { Type } from 'class-transformer';

class AuthorDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;
}

export class CommentWithRepliesDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    text: string;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AuthorDto)
    author: AuthorDto;

    @IsNotEmpty()
    children: CommentResponseDto[];
}
