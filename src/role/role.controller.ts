import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import {Roles} from '../decorator/role.enum';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}



  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post(':id')
   async create(@Body() role: Role): Promise<{ message:string;role:Role}> {
    const createdRole= await this.roleService.create(role);
    return { message: "Role created", role: createdRole }
  }
  
  
  @Patch(':id')
  update(@Param('id') id: number){
        return this.roleService.update(id)
    }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
  @Post(':roleId/permissions')
  async addPermissionsToRole(
    @Param('roleId') roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ): Promise<void> {
    await this.roleService.addPermissionToRole(roleId, permissionIds);
  }
}
