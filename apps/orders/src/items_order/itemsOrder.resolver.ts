import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
  ResolveReference,
  Query,
} from "@nestjs/graphql";
import { ItemsOrderService } from "./itemsOrder.service";
import { ItemsOrder } from "./ItemOrder.entity";
import { Items } from "apps/items/src/item/items.entity";
import { Orders } from "../orders/order.entity";
import { ItemService } from "apps/items/src/item/items.service";
@Resolver(() => ItemsOrder)
export class ItemsOrderResolver {
  constructor(
    private itemsOrderService: ItemsOrderService,
    private itemsService: ItemService
  ) {}
  @Mutation(() => ItemsOrder)
  updateItemAmount(
    @Args("item_id") item_id: number,
    @Args("order_id") order_id: number,
    @Args("amount") amount: number
  ) {
    return this.itemsOrderService.updateItemAmount(item_id, order_id, amount);
  }
  @Query(() => [ItemsOrder])
  async getItemsOrder() {
    return this.itemsOrderService.getItemsOrder();
  }

  @ResolveField("item", () => Items)
  async item(@Parent() itemsOrder: ItemsOrder) {
    return await this.itemsService.getItemById(itemsOrder.item_id);
  }
}
