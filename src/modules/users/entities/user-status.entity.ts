
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_status') // <-- Pastikan nama tabel ini sesuai di database kamu
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    description: string;

}