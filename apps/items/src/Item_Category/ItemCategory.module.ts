import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsCategories } from "./ItemCategory.entity";
import { ItemsCategoriesService } from "../Item_Category/ItemCategory.service";
import { Items } from "../item/items.entity";
import { CatergoyModule } from "../category/categories.module";
import { ItemCategoriesResolver } from "./ItemCategory.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsCategories, Items]), CatergoyModule],
  providers: [ItemsCategoriesService, ItemCategoriesResolver],
  exports: [ItemsCategoriesService],
})
export class ItemCategoriesModule {}
