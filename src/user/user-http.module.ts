import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { AppController } from '../app.controller';

@Module({
  imports: [UserModule],
  providers: [UserService],
  controllers: [AppController]
})
export class UserHttpModule {}