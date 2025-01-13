import { Resolver, Query, Args, Mutation, ResolveField, Parent, Context } from "@nestjs/graphql";
import { ItemService } from "./item.service";
import { Item } from "./item.entity";
import { IDataloaders } from "../dataloader/dataloader.interface";
import { ItemStatus } from "packages/enum/items-status.enum";
import { Category } from "../category/categories.entity";

@Resolver(() => Item)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(() => Item)
  async getItemById(@Args("id") id: number): Promise<Item> {
    return this.itemService.getItemById(id);
  }

  @Query(() => [Item])
  async getItems() {
    return this.itemService.getItems();
  }

  @Query(() => Boolean)
  async doesIdExist(@Args("id") id: number) {
    return this.itemService.isIdExist(id);
  }

  @Mutation(() => Item)
  async deleteItem(@Args("id") id: number) {
    return this.itemService.deleteItem(id);
  }

  @Mutation(() => Item)
  async updateItemPrice(@Args("id") id: number, @Args("price") price: number) {
    return this.itemService.updateItemPrice(id, price);
  }

  @Mutation(() => Item)
  async updateItemStatus(@Args("id") id: number, @Args("status") status: ItemStatus) {
    return this.itemService.updateItemStatus(id, status);
  }

  @ResolveField("categories", () => [Category])
  async getCategories(@Parent() item: Item, @Context() { loaders }: { loaders: IDataloaders }) {
    return loaders.itemCategoryLoader.load(item.id);
  }
}
