import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity('comments')
export class Comment extends BaseEntity {
    @Column({ type: 'text' })
    text: string;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    author: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;

    @OneToMany(() => Comment, (comment) => comment.parent, { nullable: true })
    children?: Comment[] | null;

    @ManyToOne(() => Comment, (comment) => comment.children, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    parent?: Comment | null;
}
