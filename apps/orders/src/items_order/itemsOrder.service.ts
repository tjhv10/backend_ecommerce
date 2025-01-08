import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";
import { OrderService } from "../order/order.service";
import { HttpUtilService } from "packages/httpUtil/httpUtil.service";

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>,
    private readonly orderService: OrderService,
    private readonly httpUtilService: HttpUtilService
  ) {}

  async updateItemAmount(
    order_id: number,
    item_id: number,
    amount: number
  ): Promise<ItemsOrder> {
    const item = await this.ItemsOrderRepository.findOne({
      where: { orderId: order_id, item_id: item_id },
    });
    item.amount = amount;
    return this.ItemsOrderRepository.save(item);
  }

  async getItemByIdFromItems(item_id: number): Promise<any> {
    return this.httpUtilService.getItemByIdFromItems(item_id);
  }

  async createrItemOrder(
    createItemsOrderInput: CreateItemsOrderInput
  ): Promise<ItemsOrder> {
    if (createItemsOrderInput.amount <= 0) {
      throw new NotFoundException("amount must be greater than 0");
    }
    if (
      (
        await this.ItemsOrderRepository.find({
          where: { id: createItemsOrderInput.id },
        })
      ).length > 0
    ) {
      throw new NotFoundException("itemsOrderId already exists");
    }
    if (
      (await this.getItemByIdFromItems(createItemsOrderInput.item_id)) === null
    ) {
      throw new NotFoundException("itemId does not exist");
    }

    const newItems_Order = this.ItemsOrderRepository.create(
      createItemsOrderInput
    );
    this.orderService.createOrder(createItemsOrderInput.order_id, new Date());
    return this.ItemsOrderRepository.save(newItems_Order);
  }
  async getItemsOrder(): Promise<ItemsOrder[]> {
    return this.ItemsOrderRepository.find();
  }
  async getItemsOrdersByOrderId(id: number): Promise<ItemsOrder[]> {
    const found = await this.ItemsOrderRepository.find({
      where: { orderId: id },
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
