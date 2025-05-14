import {
    IsOptional,
    IsString,
    Length,
    IsArray,
    ValidateNested,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from '../../../images/dto/image.dto';

export class UpdatePostDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type((): typeof ImageDto => ImageDto)
    imageUrls?: ImageDto[];
}
