import { Resolver, Query, Args } from "@nestjs/graphql";
import { CategoryService } from "./categories.service";
import { Category } from "./categories.entity";

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  async getCategoryById(@Args("id") id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => [Category])
  async getCategories() {
    return this.categoryService.getCategories();
  }
}
