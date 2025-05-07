import { IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    content: string;

    @IsNotEmpty()
    @IsUUID()
    senderId: string;

    @IsNotEmpty()
    @IsUUID()
    recipientId: string;
}
