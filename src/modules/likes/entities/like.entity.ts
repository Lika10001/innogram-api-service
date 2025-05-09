import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity('likes')
export class Like extends BaseEntity {
    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
    post: Post;
}
