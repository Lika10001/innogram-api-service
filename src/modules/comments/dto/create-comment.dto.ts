import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    postId: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}
