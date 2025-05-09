import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../common/entities/baseEntity';

@Entity('messages')
export class Message extends BaseEntity {
    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: 'CASCADE' })
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages, {
        onDelete: 'CASCADE',
    })
    recipient: User;
}
