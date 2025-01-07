import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
