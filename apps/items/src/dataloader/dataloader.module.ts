import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { ItemsOrderModule } from "apps/orders/src/items_order/itemsOrder.module";

@Module({
  imports: [ItemCategoriesModule, ItemsOrderModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
