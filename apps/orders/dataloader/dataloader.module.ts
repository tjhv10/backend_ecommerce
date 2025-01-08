import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemsOrderModule } from "apps/orders/src/items_order/Item-order.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "apps/orders/src/items_order/Item-order.entity";
import { Order } from "apps/orders/src/order/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder, Order]), ItemsOrderModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
