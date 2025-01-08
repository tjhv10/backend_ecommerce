import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {}

  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return true;
  }

  async getOrdersById(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  // TOOD: don't pass id to create order
  async createOrder(id: number, orderDate: Date) {
    if ((await this.getOrdersById(id)) !== null) {
      return;
    }
    const order = this.orderRepository.create({
      orderDate: orderDate,
    });
    return this.orderRepository.save(order);
  }

  async getOrdersWithProducts() {
    return this.orderRepository.find();
  }
}
