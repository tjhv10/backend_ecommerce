import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostInput } from "./dto/create-order.input";
import { Orders } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>
  ) {}
  async deleteItem(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return true;
  }
  async getOrdersWithProducts(): Promise<Orders[]> {
    return this.orderRepository.find();
  }
  async getOrdersWithProductsWithIdUnder300(): Promise<Orders[]> {
    return this.orderRepository.find();
  }
}
