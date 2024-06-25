import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[]; 
  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'roles_has_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}