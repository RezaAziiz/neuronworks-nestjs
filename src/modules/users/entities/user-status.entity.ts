
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_status') 
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    description: string;

}