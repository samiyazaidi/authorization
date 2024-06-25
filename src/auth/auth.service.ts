import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, 
    private readonly jwtService: JwtService){}
    

  
    async signIn(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload={ sub:user.id, username:user.username, password:user.password, roles:user.roles}
      return await this.jwtService.signAsync(payload)
    }
  }
