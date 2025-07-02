
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
    if (!status) throw new Error('Default status not found'); // Pastikan ID 1 ('active') selalu ada di DB

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
}