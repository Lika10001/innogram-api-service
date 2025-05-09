import {
    IsNotEmpty,
    IsUUID,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';
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

export class CommentResponseDto {
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

    children?: CommentResponseDto[] | null;
}
