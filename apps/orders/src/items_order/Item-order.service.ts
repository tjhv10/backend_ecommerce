import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemsOrder } from "./Item-order.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";
import { OrderService } from "../order/order.service";
import { HttpUtilService } from "packages/httpUtil/httpUtil.service";
import { UpdateAmountInput } from "./dto/update-amount.input";
import { Item } from "apps/items/src/items/item.entity";

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>,
    private readonly orderService: OrderService,
    private readonly httpUtilService: HttpUtilService
  ) {}

  async updateItemAmount(updateAmountInput: UpdateAmountInput): Promise<ItemsOrder> {
    const item = await this.ItemsOrderRepository.findOne({
      where: {
        orderId: updateAmountInput.orderId,
        itemId: updateAmountInput.itemId,
      },
    });
    item.amount = updateAmountInput.amount;
    return this.ItemsOrderRepository.save(item);
  }

  async getItemsIds(): Promise<Item[]> {
    return this.httpUtilService.getItemsIds();
  }
  async getItemByIdFromItems(itemId: number): Promise<Item> {
    return this.httpUtilService.getItemByIdFromItems(itemId);
  }

  async createItemsOrder(createItemsOrderInputs: CreateItemsOrderInput[]): Promise<ItemsOrder[]> {
    createItemsOrderInputs.forEach((input) => {
      if (input.amount <= 0) {
        throw new NotFoundException("amount must be greater than 0");
      }
    });
    await Promise.all(
      createItemsOrderInputs.map(async (input) => {
        const items = await this.getItemsIds();
        console.log(items);
        if (!items.some((item) => item.id === input.itemId)) {
          throw new NotFoundException(`itemId ${input.itemId} does not exist`);
        }
      })
    );
    const order = await this.orderService.createOrder(new Date());
    const newItemsOrder = [];
    await Promise.all(
      createItemsOrderInputs.map(async (input) => {
        const newItemOrder = this.ItemsOrderRepository.create({ orderId: order.id, ...input });
        newItemsOrder.push(await this.ItemsOrderRepository.save(newItemOrder));
      })
    );
    return newItemsOrder;
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

  async getItemsOfOrderByBatch(orderIds: readonly number[]): Promise<ItemsOrder[][]> {
    return Promise.all(orderIds.map((id) => this.getItemsOrdersByOrderId(id)));
  }
}
