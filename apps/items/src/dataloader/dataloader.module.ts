import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemCategoriesModule } from "apps/items/src/Item_Category/ItemCategory.module";

@Module({
  imports: [ItemCategoriesModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
