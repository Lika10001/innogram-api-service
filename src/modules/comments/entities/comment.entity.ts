import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../common/entities/base-entity';

@Entity('comments')
export class Comment extends BaseEntity {
    @Column({ type: 'text' })
    text: string;

    @ManyToOne((): typeof User => User, (user): Comment[] => user.comments, {
        onDelete: 'CASCADE',
    })
    author: User;

    @ManyToOne((): typeof Post => Post, (post): Comment[] => post.comments, {
        onDelete: 'CASCADE',
    })
    post: Post;

    @OneToMany(
        (): typeof Comment => Comment,
        (comment): Comment | null | undefined => comment.parent,
        {
            nullable: true,
        },
    )
    children?: Comment[] | null;

    @ManyToOne(
        (): typeof Comment => Comment,
        (comment): Comment[] | null | undefined => comment.children,
        {
            onDelete: 'CASCADE',
            nullable: true,
        },
    )
    parent?: Comment | null;
}
