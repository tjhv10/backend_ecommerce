import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { ItemsOrderModule } from "apps/orders/src/items_order/itemsOrder.module";
import { ItemsOrderService } from "apps/orders/src/items_order/itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";
import { HttpModule } from "@nestjs/axios";
import { OrderService } from "apps/orders/src/orders/order.service";
import { Orders } from "apps/orders/src/orders/order.entity";

@Module({
  imports: [
    ItemCategoriesModule,
    ItemsOrderModule,
    TypeOrmModule.forFeature([ItemsOrder, Orders]),
    HttpModule,
  ],
  providers: [DataloaderService, ItemsOrderService, OrderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
