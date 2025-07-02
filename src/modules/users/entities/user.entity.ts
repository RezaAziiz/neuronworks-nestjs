
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Status } from './user-status.entity' 
@Entity('users') 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  register_date: Date;

  @ManyToOne(() => Status, { eager: true }) 
  @JoinColumn({ name: 'status_id' }) 
  status: Status;
}