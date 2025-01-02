import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { ItemsOrderModule } from "apps/orders/src/items_order/itemsOrder.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";
import { Orders } from "apps/orders/src/orders/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder, Orders]), ItemsOrderModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
