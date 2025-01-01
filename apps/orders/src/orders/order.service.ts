import { Injectable, NotFoundException } from "@nestjs/common";
import { Orders } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ItemsOrderService } from "../items_order/itemsOrder.service";
import { OrderWithItems } from "./OrderWithItems.interface";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    private readonly httpService: HttpService,
    private readonly itemsOrderService: ItemsOrderService
  ) {}
  async deleteOrder(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return true;
  }

  async getOrdersWithProducts(): Promise<OrderWithItems[]> {
    const query = `
          query {
          getItems {
            id
            name
            price
            upload_date
            description
            seller_name
            categories
            {
              id
              name
            }
          }
        }
      `;
    const orders = await this.itemsOrderService.getItemsOrder();
    const items = (
      await firstValueFrom(
        this.httpService.post("http://localhost:3000/graphql", { query })
      )
    ).data.data.getItems;
    const toReturn = [];
    orders.forEach((order) => {
      const orderWithItems = {
        ...order,
        items: items.filter(
          (item: { id: number }) => order.item_id === item.id
        ),
      };
      toReturn.push(orderWithItems);
    });
    return toReturn;
  }

  async getOrdersWithProductsWithIdUnder300(): Promise<Orders[]> {
    return this.orderRepository.find();
  }
}
