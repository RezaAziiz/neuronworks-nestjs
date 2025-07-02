
import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterAuthDto): Promise<any> {
  const { email, password } = registerDto;

  const existing = await this.usersService.findByEmail(email);
  if (existing) throw new BadRequestException('Email already used');

  const hashed = await bcrypt.hash(password, 10);

  const user = await this.usersService.create({
    email,
    password: hashed,
  });

  return {
    email: user.email,
    createdAt: user.register_date,
    status_id: user.status.id,
    status: {
      id: user.status.id,
      description: user.status.description, 
    },
  };
}
}