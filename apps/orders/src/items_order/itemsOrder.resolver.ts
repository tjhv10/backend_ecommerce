import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ItemsOrderService } from './itemsOrder.service';
import { ItemsOrder } from './entities/ItemOrder.entity';
// import { Items } from '../../items/src/item/items.entity';

@Resolver(() => ItemsOrder)
export class ItemsOrderResolver {
  constructor(private itemsOrderService: ItemsOrderService) {}

  @Mutation(() => ItemsOrder)
  updateItemPrice(
    @Args('item_id') item_id: number,
    @Args('order_id') order_id: number,
    @Args('amount') amount: number,
  ) {
    return this.itemsOrderService.updateItemPrice(item_id, order_id, amount);
  }
}
