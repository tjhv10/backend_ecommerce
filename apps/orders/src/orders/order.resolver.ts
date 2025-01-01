import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Orders as Orders } from "./order.entity";
// import { Items } from '../../items/src/item/items.entity';

@Resolver(() => Orders)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [])
  async getOrdersWithProducts() {
    return this.orderService.getOrdersWithProducts();
  }

  @Query(() => [Orders])
  getOrdersWithProductsWithIdUnder300() {
    return this.orderService.getOrdersWithProductsWithIdUnder300();
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args("id") id: number): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }
}
