import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 64 })
    name: string;

    @Column({ length: 64, unique: true })
    email: string;

    @Column({ length: 20, unique: true, nullable: true })
    phone: string | null;

    @Column({ length: 64 })
    password: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Message, (message) => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, (message) => message.recipient)
    receivedMessages: Message[];

    @OneToMany(() => User, (user) => user.followers)
    following: User[];

    @OneToMany(() => User, (user) => user.following)
    followers: User[];
}
