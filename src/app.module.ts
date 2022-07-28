import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { typeOrmConfigAsync } from './config/configuration'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { DwellingModule } from './dwelling/dwelling.module'
import { TagModule } from './tag/tag.module'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CountryModule } from './country/country.module'
import { CityModule } from './city/city.module'
import { StreetModule } from './street/street.module'
import { AddressModule } from './address/address.module'
import { OrderModule } from './order/order.module'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.test.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    RoleModule,
    AuthModule,
    DwellingModule,
    TagModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    CountryModule,
    CityModule,
    StreetModule,
    AddressModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }
