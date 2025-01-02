import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { CreateItems_orderInput } from "./dto/create-Items-order.input";
import { Items } from "apps/items/src/item/items.entity";
import { ItemService } from "apps/items/src/item/items.service";

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>
  ) {}
  async updateItemAmount(
    order_id: number,
    item_id: number,
    amount: number
  ): Promise<ItemsOrder> {
    const item = await this.ItemsOrderRepository.findOne({
      where: { order_id: order_id, item_id: item_id },
    });
    item.amount = amount;
    return this.ItemsOrderRepository.save(item);
  }
  async createrItemOrder(
    createItems_orderInput: CreateItems_orderInput
  ): Promise<ItemsOrder> {
    const newItems_Order = this.ItemsOrderRepository.create(
      createItems_orderInput
    );
    return this.ItemsOrderRepository.save(newItems_Order);
  }
  async getItemsOrder(): Promise<ItemsOrder[]> {
    return this.ItemsOrderRepository.find();
  }
  async getItemsOrdersByOrderId(id: number): Promise<ItemsOrder[]> {
    const found = await this.ItemsOrderRepository.find({
      where: { order_id: id },
    });
    if (!found || found.length === 0) {
      throw new NotFoundException(`order with id "${id}" dosent have items`);
    }

    return found;
  }
  public async getItemsOfOrderByBatch(
    orderIds: readonly number[]
  ): Promise<ItemsOrder[][]> {
    return Promise.all(orderIds.map((id) => this.getItemsOrdersByOrderId(id)));
  }
}
