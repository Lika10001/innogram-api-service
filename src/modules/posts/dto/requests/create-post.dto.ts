import {
    IsNotEmpty,
    IsOptional,
    Length,
    IsString,
    IsArray,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from '../../../images/dto/image.dto';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type((): typeof ImageDto => ImageDto)
    imageUrls?: ImageDto[];

    @IsNotEmpty()
    @IsUUID()
    authorId: string;
}
