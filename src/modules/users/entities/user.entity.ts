
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Status } from './user-status.entity' // Nama class entitasnya 'Status', bukan 'UserStatus'

@Entity('users') // Pastikan nama tabel di DB adalah 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  register_date: Date;

  @ManyToOne(() => Status, { eager: true }) // <-- TAMBAHKAN eager: true DI SINI
  @JoinColumn({ name: 'status_id' }) // Jika kolom di tabel User adalah status_id
  status: Status;
}