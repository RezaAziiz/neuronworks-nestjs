
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Status } from './entities/user-status.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const status = await this.statusRepository.findOne({ where: { id: 1 } });
    if (!status) throw new Error('Default status not found'); 

    const user = this.usersRepository.create({
      ...createUserDto,
      status, 
    });
    
    return this.usersRepository.save(user);
  }

  findAll() {
   
    return this.usersRepository.find({ relations: ['status'] });
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { email } });
}

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id }, relations: ['status'] });
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
  }