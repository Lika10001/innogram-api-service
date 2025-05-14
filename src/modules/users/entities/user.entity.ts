import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';
import { Message } from '../../messages/entities/message.entity';
import { BaseEntity } from '../../../common/entities/base-entity';

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

    @OneToMany((): typeof Post => Post, (post): User => post.author)
    posts: Post[];

    @OneToMany((): typeof Comment => Comment, (comment): User => comment.author)
    comments: Comment[];

    @OneToMany((): typeof Like => Like, (like): User => like.user)
    likes: Like[];

    @OneToMany((): typeof Message => Message, (message): User => message.sender)
    sentMessages: Message[];

    @OneToMany(
        (): typeof Message => Message,
        (message): User => message.recipient,
    )
    receivedMessages: Message[];

    @ManyToMany((): typeof User => User, (u): User[] => u.following)
    @JoinTable({
        name: 'user_followers',
        joinColumn: { name: 'following_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
    })
    followers: User[];

    @ManyToMany((): typeof User => User, (u): User[] => u.followers)
    following: User[];
}
