import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { OrderService } from "../orders/order.service";
import { Items } from "apps/items/src/item/items.entity";

@Injectable()
export class ItemsOrderService {
  constructor(
    @InjectRepository(ItemsOrder)
    private ItemsOrderRepository: Repository<ItemsOrder>,
    private readonly httpService: HttpService,
    private readonly orderService: OrderService
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

  async getItemByIdFromItems(item_id: number): Promise<Items> {
    const query = `
      query {
        getItemById(id: ${item_id}) {
          id
          name
          price
          upload_date
          description
          seller_name
          categories {
            id
            name
          }
        }
      }
    `;
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3000/graphql", { query })
    );
    console.log(response.data.data.getItemById);

    return response.data.data.getItemById;
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
      this.getItemByIdFromItems(createItemsOrderInput.item_id) === undefined
    ) {
      //TODO check if works
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
