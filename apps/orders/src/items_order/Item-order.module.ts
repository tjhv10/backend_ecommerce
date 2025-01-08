import { Module } from "@nestjs/common";
import { ItemsOrderService } from "./Item-order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./Item-order.entity";
import { Item } from "apps/items/src/items/item.entity";
import { Order } from "../order/order.entity";
import { OrderModule } from "../order/order.module";
import { ItemsOrderResolver } from "./Item-order.resolver";
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
