import {
    IsEmail,
    IsOptional,
    Length,
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 64)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(5, 64)
    email: string;

    @IsOptional()
    @IsString()
    @Length(7, 20)
    phone?: string | null;

    @IsOptional()
    @IsString()
    @Length(6, 64)
    password: string;
}
