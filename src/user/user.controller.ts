import { Controller, Get, Post, Body, Param, Delete,ParseIntPipe,ValidationPipe, Patch, UseGuards,Request } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../decorator/role.enum';
import { Role } from '../decorator/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}


@Post('/admin')
@UseGuards(RolesGuard)
@Role(Roles.Admin)
admin(@Request()req):string {
  return  `${JSON.stringify(req.user)}`
}
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
 
  @Post(':id')
  create(@Param('id', ParseIntPipe) id: number,@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.userService.create(id,createUserDto)
    }
  
   @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number,@Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.userService.update(id, userUpdate)
    }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
  @Post(':userId/roles')
  async addRolesToUser(
    @Param('userId') userId: number,
    @Body('roleIds') roleIds: number[],
  ): Promise<{message:string}> {
    await this.userService.addRolesToUser(userId, roleIds);
    
  return {message: "role assigned"}
  }
}
