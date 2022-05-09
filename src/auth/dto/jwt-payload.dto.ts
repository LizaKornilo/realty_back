import { Role } from './../../entity/role.entity';

export class JwtPayloadDto {
  username: string;
  email: string;
  sub: number;
  role: Role;
}