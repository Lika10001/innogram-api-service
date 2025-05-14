import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../common/entities/base-entity';

@Entity('messages')
export class Message extends BaseEntity {
    @Column({ type: 'text' })
    content: string;

    @ManyToOne(
        (): typeof User => User,
        (user): Message[] => user.sentMessages,
        { onDelete: 'CASCADE' },
    )
    sender: User;

    @ManyToOne(
        (): typeof User => User,
        (user): Message[] => user.receivedMessages,
        {
            onDelete: 'CASCADE',
        },
    )
    recipient: User;
}
