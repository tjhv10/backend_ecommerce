import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from "@nestjs/graphql";
import { ItemsOrderService } from "./Item-order.service";
import { ItemsOrder } from "./Item-order.entity";
import { Item } from "apps/items/src/items/item.entity";
import { CreateItemsOrderInput } from "./dto/create-Items-order.input";
import { UpdateAmountInput } from "./dto/update-amount.input";

@Resolver(() => ItemsOrder)
export class ItemsOrderResolver {
  constructor(private itemsOrderService: ItemsOrderService) {}
  @Mutation(() => ItemsOrder)
  updateItemAmount(
    @Args("createItemsOrderInput") updateAmountInput: UpdateAmountInput
  ) {
    return this.itemsOrderService.updateItemAmount(updateAmountInput);
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
      await this.itemsOrderService.getItemByIdFromItems(itemsOrder.itemId)
    ).getItemById;
  }
}
