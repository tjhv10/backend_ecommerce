import { Resolver, Query, Args } from "@nestjs/graphql";
import { ItemsCategories } from "./Item-category.entity";
import { ItemsCategoriesService } from "./Item-category.service";

@Resolver(() => ItemsCategories)
export class ItemCategoriesResolver {
  constructor(private itemsCategoriesService: ItemsCategoriesService) {}

  @Query(() => [ItemsCategories])
  async getItemsCategories(): Promise<ItemsCategories[]> {
    return this.itemsCategoriesService.getItemsCategories();
  }

  @Query(() => [ItemsCategories])
  async getItemsCategoriesById(
    @Args("id") id: number
  ): Promise<ItemsCategories[]> {
    return this.itemsCategoriesService.getItemsCategoriesByItemId(id);
  }
}
