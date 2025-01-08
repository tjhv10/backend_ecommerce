import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from "@nestjs/graphql";
import { ItemsOrderService } from "./itemsOrder.service";
import { ItemsOrder } from "./ItemOrder.entity";
import { Item } from "apps/item/src/item/item.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";

@Resolver(() => ItemsOrder)
export class ItemsOrderResolver {
  constructor(private itemsOrderService: ItemsOrderService) {}
  @Mutation(() => ItemsOrder)
  updateItemAmount(
    @Args("item_id") item_id: number,
    @Args("order_id") order_id: number,
    @Args("amount") amount: number
  ) {
    return this.itemsOrderService.updateItemAmount(item_id, order_id, amount);
  }
  @Query(() => Item)
  async getItemByIdFromItems(@Args("id") id: number): Promise<Item> {
    return this.itemsOrderService.getItemByIdFromItems(id);
  }
  @Query(() => [ItemsOrder])
  async getItemsOrder() {
    return this.itemsOrderService.getItemsOrder();
  }
  @Mutation(() => ItemsOrder)
  async createItemOrder(
    @Args("createItemsOrderInput") createItemsOrderInput: CreateItemsOrderInput
  ) {
    return this.itemsOrderService.createrItemOrder(createItemsOrderInput);
  }

  @ResolveField("item", () => Item)
  async item(@Parent() itemsOrder: ItemsOrder) {
    return (
      await this.itemsOrderService.getItemByIdFromItems(itemsOrder.item_id)
    ).getItemById;
  }
}
