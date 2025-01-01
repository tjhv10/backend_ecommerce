import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { ItemsOrderService } from "./itemsOrder.service";
import { ItemsOrder } from "./ItemOrder.entity";
import { query } from "express";

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
}
