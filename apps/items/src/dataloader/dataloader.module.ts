import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { ItemsOrderModule } from "apps/orders/src/items_order/itemsOrder.module";
import { ItemsCategoriesService } from "../Item_Category/ItemCategory.service";
import { ItemsOrderService } from "apps/orders/src/items_order/itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";

@Module({
  imports: [
    ItemCategoriesModule,
    ItemsOrderModule,
    TypeOrmModule.forFeature([ItemsOrder]),
  ],
  providers: [DataloaderService, ItemsOrderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
