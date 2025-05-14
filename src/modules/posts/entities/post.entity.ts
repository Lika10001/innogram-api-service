import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';
import { BaseEntity } from '../../../common/entities/base-entity';
import { Image } from '../../images/entities/image.entity';

@Entity('posts')
export class Post extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @OneToMany((): typeof Image => Image, (image): Post => image.post, {
        cascade: true,
    })
    imageUrls?: Image[];

    @ManyToOne((): typeof User => User, (user): Post[] => user.posts, {
        onDelete: 'CASCADE',
    })
    author: User;

    @OneToMany((): typeof Comment => Comment, (comment): Post => comment.post)
    comments: Comment[];

    @OneToMany((): typeof Like => Like, (like): Post => like.post)
    likes: Like[];
}
