import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpUtilService } from "./httpUtil.service";

@Module({
  imports: [HttpModule],
  providers: [HttpUtilService],
  exports: [HttpUtilService],
})
export class HttpUtilModule {}
