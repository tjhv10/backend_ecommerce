import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Items } from "./items.entity";
import { ItemService } from "./items.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { DataloaderModule } from "../dataloader/dataloader.module";
import { ItemResolver } from "./items.resolver";

@Module({
  imports: [
    DataloaderModule,
    TypeOrmModule.forFeature([Items]),
    ItemCategoriesModule,
  ],
  providers: [ItemService, ItemResolver],
  exports: [ItemService],
})
export class ItemModule {}
