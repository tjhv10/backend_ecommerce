import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Items } from "./items.entity";
import { ItemResolver } from "./items.resolver";
import { ItemService } from "./items.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { DataloaderModule } from "../dataloader/dataloader.module";

@Module({
  imports: [
    ItemCategoriesModule,
    TypeOrmModule.forFeature([Items]),
    DataloaderModule,
  ],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
