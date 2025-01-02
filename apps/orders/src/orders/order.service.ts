import { Injectable, NotFoundException } from "@nestjs/common";
import { Orders } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ItemsOrderService } from "../items_order/itemsOrder.service";
import { log } from "console";

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

  async getOrdersWithProducts() {
    return this.orderRepository.find();
  }

  async getOrdersWithProductsWithIdUnder300(): Promise<Orders[]> {
    return this.orderRepository.find();
  }
}
