import { Role } from './../entity/role.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) { }

  async getOneByValue (value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } })
    if (!role) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Role with value = ${value} not found`
      }, HttpStatus.NOT_FOUND)
    }
    return role
  }

  async getOne (id: number): Promise<Role> {
    const role = await this.roleRepository.findOne(id)
    if (!role) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Role with id = ${id} not found`
      }, HttpStatus.NOT_FOUND)
    }
    return role
  }
}
