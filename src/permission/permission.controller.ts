import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Post()
  create(@Body() permission: Permission): Promise<Permission> {
    return this.permissionService.create(permission);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.permissionService.remove(id);
  }
}
