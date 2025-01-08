import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { ItemService } from "./item.service";
import { ItemCategoriesModule } from "../Item_Category/Item-category.module";
import { DataloaderModule } from "../dataloader/dataloader.module";
import { ItemResolver } from "./item.resolver";

@Module({
  imports: [
    DataloaderModule,
    TypeOrmModule.forFeature([Item]),
    ItemCategoriesModule,
  ],
  providers: [ItemService, ItemResolver],
  exports: [ItemService],
})
export class ItemModule {}
