import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardd } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
@HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @UseGuards(AuthGuardd)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
