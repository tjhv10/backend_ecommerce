import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Context,
} from "@nestjs/graphql";
import { ItemService } from "./items.service";
import { Items } from "./items.entity";
import { ItemStatus } from "./items-status.enum";
import { Category } from "../category/categories.entity";
import { IDataloaders } from "../dataloader/dataloader.interface";
// import { ItemStatus } from '../../../item_status';
@Resolver(() => Items)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(() => Items)
  async getItemById(@Args("id") id: number): Promise<Items> {
    return this.itemService.getItemById(id);
  }

  @Query(() => [Items])
  getItems() {
    return this.itemService.getItems();
  }

  @Query(() => Boolean)
  doesIdExist(@Args("id") id: number) {
    return this.itemService.isIdExist(id);
  }

  @Mutation(() => Items)
  deleteItem(@Args("id") id: number) {
    return this.itemService.deleteItem(id);
  }

  @Mutation(() => Items)
  updateItemPrice(@Args("id") id: number, @Args("price") price: number) {
    return this.itemService.updateItemPrice(id, price);
  }

  @Mutation(() => Items)
  updateItemStatus(@Args("id") id: number, @Args("status") status: ItemStatus) {
    return this.itemService.updateItemStatus(id, status);
  }

  // @ResolveField('categories', () => [Category])
  @ResolveField(() => [Category])
  async getCategories(
    @Parent() item: Items,
    @Context() { loaders }: { loaders: IDataloaders }
  ) {
    return loaders.itemCategoryLoader.load(item.id);
  }
}
