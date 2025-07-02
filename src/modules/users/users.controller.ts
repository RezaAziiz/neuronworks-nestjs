import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //CREATE
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  //READ ALL
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //READ ONE
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //UPDATE
  @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) throw new NotFoundException('User not found');
    return user;
    }

  //DELETE
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    const deleted = await this.usersService.remove(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { deleted: true };
  }
}