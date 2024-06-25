import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOneOrFail({ where: { id }, relations: ['permissions'] });
  }

  create(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }
  async update(id: number): Promise<Role> {
    const user = await this.roleRepository.findOneBy({ id });
    Object.assign(user);
    await this.roleRepository.save(user);

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }

async addPermissionToRole(roleId: number, permissionIds: number[]): Promise<void> {
  const role = await this.roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions'],
  });

  if (!role) {
    throw new Error('Role not found');
  }

  
  const permissions = await this.permissionRepository.find({
    where: permissionIds.map(id => ({ id })),
  });

  role.permissions.push(...permissions);

  await this.roleRepository.save(role);
}
}

  

