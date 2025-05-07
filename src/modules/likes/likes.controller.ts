import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Post()
    create(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
        return this.likesService.create(createLikeDto);
    }

    @Get()
    findAll(): Promise<Like[]> {
        return this.likesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Like> {
        return this.likesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.likesService.remove(id);
    }
}
