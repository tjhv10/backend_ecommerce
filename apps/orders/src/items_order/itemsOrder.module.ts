import { Module } from "@nestjs/common";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { Item } from "apps/item/src/item/item.entity";
import { Order } from "../order/order.entity";
import { OrderModule } from "../order/order.module";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { HttpUtilModule } from "packages/httpUtil/httpUtil.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsOrder, Item, Order]),
    HttpUtilModule,
    OrderModule,
  ],
  providers: [ItemsOrderService, ItemsOrderResolver],
  exports: [ItemsOrderService],
})
export class ItemsOrderModule {}
