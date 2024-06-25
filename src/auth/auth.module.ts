import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardd } from './auth.guard';

@Module({
    imports: [
      PassportModule,
      
      forwardRef(() => UserModule),
      JwtModule.register({
        secret: "key", // jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [
      AuthService,
      UserService,
      LocalStrategy, {
        provide: APP_GUARD,
        useClass: AuthGuardd,
      },
    ],
    exports: [AuthService],
    controllers: [AuthController],
  })
export class AuthModule {}
