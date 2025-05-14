import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class ImageDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 255)
    url: string;
}
