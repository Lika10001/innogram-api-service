import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './configs/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(dbConfig),
        UsersModule,
        PostsModule,
        CommentsModule,
        LikesModule,
        MessagesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
