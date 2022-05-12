import { UserService } from './../user/user.service';
import { DwellingService } from './../dwelling/dwelling.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './../entity/order.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private dwellingService: DwellingService,
    private userService: UserService,
  ) { }

  async addOne(createOrderDto: CreateOrderDto, userId: number) {
    const areTheDatesUnavailable: Boolean = !!(await this.getCountOfOrdersThatIntersectWithPeriod(createOrderDto.dwellingId, createOrderDto.start_date, createOrderDto.end_date));
    if (areTheDatesUnavailable)
      throw new HttpException(`Failed to make an order: selected dates are already booked`, HttpStatus.INTERNAL_SERVER_ERROR);
    const order = new Order();
    order.start_date = createOrderDto.start_date;
    order.end_date = createOrderDto.end_date;
    order.dwelling = await this.dwellingService.getOne(createOrderDto.dwellingId);
    order.user = await this.userService.getOne(userId);
    return await this.orderRepository.save(order);
  }

  private async getCountOfOrdersThatIntersectWithPeriod(dwellingId: number, newOrderStartDate: Date, newOrderEndDate: Date): Promise<number> {
    return await this.orderRepository.createQueryBuilder("order")
      .where('dwelling_id = :dwellingId', { dwellingId })
      .andWhere(`(
            (:newOrderStartDate > start_date AND :newOrderStartDate < end_date)
            OR
            (:newOrderStartDate < start_date AND :newOrderEndDate > end_date)
            OR
            (:newOrderEndDate > start_date AND :newOrderEndDate < end_date)
            )`,
        { newOrderStartDate, newOrderEndDate })
      .getCount();
  }
}
