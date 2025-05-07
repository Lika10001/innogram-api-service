import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLikeDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    postId: string;
}
