import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
