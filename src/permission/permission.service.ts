import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  findOne(id: number): Promise<Permission> {
    return this.permissionRepository.findOne({ where: { id } });
  }

  create(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}
