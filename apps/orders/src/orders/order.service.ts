import { Injectable, NotFoundException } from "@nestjs/common";
import { Orders } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    private readonly httpService: HttpService
  ) {}
  async deleteOrder(id: number) {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return true;
  }
  async getOrdersWithProducts() {
    const response = await firstValueFrom(
      this.httpService.get(
        "http://localhost:3000/graphql?query=query{getItems{name}}"
      )
    );
    console.log(response.data);
  }
  async getOrdersWithProductsWithIdUnder300(): Promise<Orders[]> {
    return this.orderRepository.find();
  }
}
