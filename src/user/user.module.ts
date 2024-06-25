import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Assuming you have a UserController
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController], // Ensure you have controllers defined
  providers: [
    UserService,
    
  ],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
