import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable  } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity({name:'users'})
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username: string;

  @Column()
  password:string;

  @Column()
  email:string;

  @Column()
  age: number;
 
  @ManyToMany(()=> Role,role => role.users)
 
@JoinTable({
  name: 'user_has_roles',
  joinColumn: { name: 'user_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
})
roles: Role[];
}