import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto} from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findOnee(id: number): Promise<User > {
    return this.usersRepository.findOneBy({ id });
}
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    return user;
  }

  async create(id: number, createUserDto: CreateUserDto): Promise<User> {
    try{
      const newUser = this.usersRepository.create({ id, ...createUserDto });
      const savedUser = await this.usersRepository.save(newUser);
      return savedUser;
    } catch(error){
      throw new Error(`Failed to create employee:${error.message}`)
    }
  }

  

 

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async addRolesToUser(userId: number, roleIds: number[]): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.roleRepository.find({
      where: roleIds.map(id => ({ id })),
    });

    user.roles.push(...roles);

    await this.usersRepository.save(user);
  }
}
