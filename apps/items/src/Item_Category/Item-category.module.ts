import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsCategories } from "./Item-category.entity";
import { ItemsCategoriesService } from "./Item-category.service";
import { Item } from "../items/item.entity";
import { CatergoyModule } from "../category/categories.module";
import { ItemCategoriesResolver } from "./Item-category.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsCategories, Item]), CatergoyModule],
  providers: [ItemsCategoriesService, ItemCategoriesResolver],
  exports: [ItemsCategoriesService],
})
export class ItemCategoriesModule {}
