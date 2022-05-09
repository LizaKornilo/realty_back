import { Roles } from './../role/roles-values.enum';
import { RoleService } from './../role/role.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entity/user.entity';
const bcrypt = require('bcryptjs');
import { RegisterReqDto } from './dto/registerReq.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) { }

  async getOneByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({
      where: { email: email },
      relations: ['role']
    });
    return user;
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `User with id = ${id} not found`,
      }, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(registerData: RegisterReqDto): Promise<User> {
    const user: User = new User();
    user.username = registerData.username;
    user.email = registerData.email;
    user.password = bcrypt.hashSync(registerData.password, 5);
    user.role = await this.roleService.getOneByValue(Roles.USER);
    user.activationKey = uuidv4();
    user.is_activated = true;
    return await this.userRepository.save(user);
  }

  async throwUserIsAlredyExistError(email: string) {
    const candidate = await this.userRepository.findOne({ where: { email: email } });
    if (candidate) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `User with email '${candidate.email}' is already exists`,
      }, HttpStatus.CONFLICT);
    }
  }

  async register(registerData: RegisterReqDto) {
    await this.throwUserIsAlredyExistError(registerData.email);
    const user: User = await this.create(registerData);
    const { password, activationKey, ...result } = await this.userRepository.save(user);
    return result;
  }

  async getAdmin(): Promise<User> {
    const adminRole = await this.roleService.getOneByValue(Roles.ADMIN);
    return await this.userRepository.findOne({ where: { role: adminRole } });
  }
}
