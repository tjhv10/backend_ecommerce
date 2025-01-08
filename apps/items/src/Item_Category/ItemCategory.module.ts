import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsCategories } from "./ItemCategory.entity";
import { ItemsCategoriesService } from "./ItemCategory.service";
import { Item } from "../items/item.entity";
import { CatergoyModule } from "../category/categories.module";
import { ItemCategoriesResolver } from "./ItemCategory.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsCategories, Item]), CatergoyModule],
  providers: [ItemsCategoriesService, ItemCategoriesResolver],
  exports: [ItemsCategoriesService],
})
export class ItemCategoriesModule {}
