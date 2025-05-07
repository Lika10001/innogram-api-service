import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    author: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children?: Comment[] | null;

    @ManyToOne(() => Comment, (comment) => comment.children, {
        onDelete: 'CASCADE',
    })
    parent?: Comment | null;
}
