import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostInput } from "./dto/create-order.input";
import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}
  async deleteItem(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return true;
  }
  async getOrdersWithProducts(): Promise<Order[]> {
    return this.orderRepository.find();
  }
  async getOrdersWithProductsWithIdUnder300(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
