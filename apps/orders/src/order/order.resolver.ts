import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  Context,
} from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order as Order } from "./order.entity";
import { ItemsOrder } from "../items_order/Item-order.entity";
import { IDataloaders } from "apps/orders/dataloader/dataloader.interface";

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Order])
  async getOrdersWithProducts() {
    return this.orderService.getOrdersWithProducts();
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args("id") id: number): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }

  @ResolveField("itemsOrder", () => [ItemsOrder])
  async getItems(
    @Parent() order: Order,
    @Context() { loaders }: { loaders: IDataloaders }
  ) {
    return loaders.itemsOrderLoader.load(order.id);
  }
}
