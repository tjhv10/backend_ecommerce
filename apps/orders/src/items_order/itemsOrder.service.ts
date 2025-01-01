import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreatePostInput } from '../orders/dto/create-order.input';
import { ItemsOrder } from './entities/ItemOrder.entity';
import { CreateItems_orderInput } from './dto/create-Items-order.input';

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>,
  ) {}
  async updateItemPrice(
    order_id: number,
    item_id: number,
    amount: number,
  ): Promise<ItemsOrder> {
    const item = await this.ItemsOrderRepository.findOne({
      where: { order_id: order_id, item_id: item_id },
    });
    item.amount = amount;
    return this.ItemsOrderRepository.save(item);
  }
  async createrItemOrder(
    createItems_orderInput: CreateItems_orderInput,
  ): Promise<ItemsOrder> {
    const newItems_Order = this.ItemsOrderRepository.create(
      createItems_orderInput,
    );
    return this.ItemsOrderRepository.save(newItems_Order);
  }
}
