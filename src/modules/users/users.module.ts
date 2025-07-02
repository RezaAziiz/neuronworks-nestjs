import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Status } from './entities/user-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Status])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}