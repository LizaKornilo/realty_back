import { Street } from './../entity/street.entity';
import { City } from './../entity/city.entity';
import { Country } from './../entity/country.entity';
import { Tag } from './../entity/tag.entity';
import { Order } from './../entity/order.entity';
import { Role } from './../entity/role.entity';
import { Dwelling } from './../entity/dwelling.entity';
import { User } from './../entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

export class TypeOrmConfig {
  static getOrmConfig (configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: parseInt(configService.get('POSTGRES_PORT'), 10),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      entities: [User, Dwelling, Role, Order, Tag, Country, City, Street],
      synchronize: false,
      logging: false,
    }
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
}