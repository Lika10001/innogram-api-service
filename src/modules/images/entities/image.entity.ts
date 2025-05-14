import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    url: string;

    @ManyToOne(
        (): typeof Post => Post,
        (post): Image[] | null | undefined => post.imageUrls,
        {
            onDelete: 'CASCADE',
        },
    )
    post: Post;
}
