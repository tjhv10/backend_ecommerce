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
import { IDataloaders } from "apps/items/src/dataloader/dataloader.interface";
// import { Items } from '../../items/src/item/items.entity';

@Resolver(() => Orders)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [ItemsOrder])
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

  @ResolveField("itemsOfOrder", () => [ItemsOrder])
  async getItems(
    @Parent() order: Orders,
    @Context() { loaders }: { loaders: IDataloaders }
  ) {
    return loaders.itemsOrderLoader.load(order.id);
  }
}
