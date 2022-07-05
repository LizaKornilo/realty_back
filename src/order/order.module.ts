import { DwellingModule } from './../dwelling/dwelling.module'
import { Order } from './../entity/order.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    DwellingModule,
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
