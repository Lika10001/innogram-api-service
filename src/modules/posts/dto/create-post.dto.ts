import {
    IsNotEmpty,
    IsOptional,
    Length,
    IsString,
    IsArray,
    IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @Transform(({ value }): string[] | string => {
        if (typeof value === 'string') return [value];
        return value;
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Length(10, 255, { each: true })
    imageUrl?: string[] | null;

    @IsNotEmpty()
    @IsUUID()
    authorId: string;
}
