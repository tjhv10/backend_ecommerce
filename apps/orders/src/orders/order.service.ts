import { Injectable, NotFoundException } from "@nestjs/common";
import { Orders } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>
  ) {}

  async deleteOrder(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return true;
  }

  async getordersById(id: number) {
    return this.orderRepository.findOne({ where: { id: id } });
  }

  async createOrder(id: number, orderDate: Date) {
    if ((await this.getordersById(id)) !== null) {
      return;
    }
    const order = this.orderRepository.create({
      id: id,
      order_date: orderDate,
    });
    return this.orderRepository.save(order);
  }

  async getOrdersWithProducts() {
    return this.orderRepository.find();
  }
}
