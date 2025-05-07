import {
    IsNotEmpty,
    IsUUID,
    IsString,
    Length,
    IsOptional,
} from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    postId: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    text: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}
