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
import { Orders as Orders } from "./order.entity";
import { ItemsOrder } from "../items_order/ItemOrder.entity";
import { IDataloaders } from "apps/orders/dataloader/dataloader.interface";

@Resolver(() => Orders)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Orders])
  async getOrdersWithProducts() {
    return this.orderService.getOrdersWithProducts();
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args("id") id: number): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }

  @ResolveField("itemsOrder", () => [ItemsOrder])
  async getItems(
    @Parent() order: Orders,
    @Context() { loaders }: { loaders: IDataloaders }
  ) {
    return loaders.itemsOrderLoader.load(order.id);
  }
}
