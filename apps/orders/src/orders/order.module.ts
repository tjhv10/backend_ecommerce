import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
