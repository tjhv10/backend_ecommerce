import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemsOrder } from "./Item-order.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";
import { OrderService } from "../order/order.service";
import { HttpUtilService } from "packages/httpUtil/httpUtil.service";
import { UpdateAmountInput } from "./dto/update-amount.input";

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>,
    private readonly orderService: OrderService,
    private readonly httpUtilService: HttpUtilService
  ) {}

  async updateItemAmount(
    updateAmountInput: UpdateAmountInput
  ): Promise<ItemsOrder> {
    const item = await this.ItemsOrderRepository.findOne({
      where: {
        orderId: updateAmountInput.orderId,
        itemId: updateAmountInput.itemId,
      },
    });
    item.amount = updateAmountInput.amount;
    return this.ItemsOrderRepository.save(item);
  }

  async getItemByIdFromItems(itemId: number): Promise<any> {
    return this.httpUtilService.getItemByIdFromItems(itemId);
  }

  async createrItemOrder(
    createItemsOrderInput: CreateItemsOrderInput
  ): Promise<ItemsOrder> {
    if (createItemsOrderInput.amount <= 0) {
      throw new NotFoundException("amount must be greater than 0");
    }
    if (
      (await this.getItemByIdFromItems(createItemsOrderInput.itemId)) === null
    ) {
      throw new NotFoundException("itemId does not exist");
    }
    await this.orderService.createOrder(
      createItemsOrderInput.orderId,
      new Date()
    );
    const newItems_Order = this.ItemsOrderRepository.create(
      createItemsOrderInput
    );
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

  async getItemsOfOrderByBatch(
    orderIds: readonly number[]
  ): Promise<ItemsOrder[][]> {
    return Promise.all(orderIds.map((id) => this.getItemsOrdersByOrderId(id)));
  }
}
