import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../common/entities/base-entity';

@Entity('likes')
export class Like extends BaseEntity {
    @ManyToOne((): typeof User => User, (user): Like[] => user.likes, {
        onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne((): typeof Post => Post, (post): Like[] => post.likes, {
        onDelete: 'CASCADE',
    })
    post: Post;
}
