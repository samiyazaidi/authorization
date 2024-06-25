import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Permission } from './permission/permission.entity';
import { Role } from './role/role.entity';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
@Module({
    imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Post@2',
      database: 'postgres',
      entities: [User,Permission,Role],
      autoLoadEntities:true,
      synchronize: true,
    }),UserModule,AuthModule,RoleModule,PermissionModule,
  ],
  controllers: [AppController,UserController,RoleController,PermissionController],
  providers: [AppService,UserService,RoleService,PermissionService],
})
export class AppModule {}
