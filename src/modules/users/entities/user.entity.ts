import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';
import { Message } from '../../messages/entities/message.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'varchar', length: 64, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
    phone: string | null;

    @Column({ type: 'varchar', length: 64 })
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

    @ManyToMany(() => User, (u) => u.following)
    @JoinTable({
        name: 'user_followers',
        joinColumn: { name: 'following_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
    })
    followers: User[];

    @ManyToMany(() => User, (u) => u.followers)
    following: User[];
}
