import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'; // Tambahkan HttpCode, HttpStatus
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('register')
@HttpCode(HttpStatus.CREATED)
async register(@Body() dto: RegisterAuthDto) {
  const data = await this.authService.register(dto);
  return {
    message: 'Saved successfully',
    data, // <-- seluruh data user di dalam property 'data'
  };
}}