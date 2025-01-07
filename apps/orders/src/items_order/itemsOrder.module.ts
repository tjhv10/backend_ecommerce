import { Module } from "@nestjs/common";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { Items } from "apps/items/src/item/items.entity";
import { Orders } from "../orders/order.entity";
import { OrderModule } from "../orders/order.module";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { HttpUtilModule } from "packages/httpUtil/httpUtil.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsOrder, Items, Orders]),
    HttpUtilModule,
    OrderModule,
  ],
  providers: [ItemsOrderService, ItemsOrderResolver],
  exports: [ItemsOrderService],
})
export class ItemsOrderModule {}
