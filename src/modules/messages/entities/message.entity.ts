import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    content: string;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: 'CASCADE' })
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages, {
        onDelete: 'CASCADE',
    })
    recipient: User;
}
