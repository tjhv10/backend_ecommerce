import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { IDataloaders } from "./dataloader.interface";
import { ItemsOrder } from "apps/orders/src/items_order/Item-order.entity";
import { ItemsOrderService } from "apps/orders/src/items_order/Item-order.service";

@Injectable()
export class DataloaderService {
  constructor(private readonly itemsOrderService: ItemsOrderService) {}

  getLoaders(): IDataloaders {
    const itemsOrderLoader = this._generateItemsOrderLoader();
    return {
      itemsOrderLoader,
    };
  }

  private _generateItemsOrderLoader() {
    return new DataLoader<number, ItemsOrder[]>(
      async (keys: readonly number[]) => {
        const itemsOrder = await this.itemsOrderService.getItemsOfOrderByBatch(
          keys as number[]
        );
        return itemsOrder.map((itemsOrderArray) =>
          itemsOrderArray.map((itemOrder) => itemOrder)
        );
      }
    );
  }
}
