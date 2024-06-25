import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  
    constructor(private readonly authService: AuthService){
        super();
    }
    async validate(username:string,password:string) : Promise<User>{
        const user: User = await this.authService.signIn(username,password);
      
        if (!user) {
            throw new UnauthorizedException();
          }
          return user;
        }
      }