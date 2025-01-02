import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { IDataloaders } from "./dataloader.interface";
import { Category } from "../category/categories.entity";
import { ItemsCategoriesService } from "../Item_Category/ItemCategory.service";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";
import { ItemsOrderService } from "apps/orders/src/items_order/itemsOrder.service";

@Injectable()
export class DataloaderService {
  constructor(
    private readonly itemsCategoriesService: ItemsCategoriesService,
    private readonly itemsOrderService: ItemsOrderService
  ) {}

  getLoaders(): IDataloaders {
    const itemCategoryLoader = this._generateCategoryNamesLoader();
    const itemsOrderLoader = this._generateItemsOrderLoader();
    return {
      itemCategoryLoader,
      itemsOrderLoader,
    };
  }

  private _generateCategoryNamesLoader() {
    return new DataLoader<number, Category[]>(
      async (keys: readonly number[]) => {
        const categories =
          await this.itemsCategoriesService.getNamesOfCategoriesByBatch(
            keys as number[]
          );
        return categories.map((categoryArray) =>
          categoryArray.map((category) => category)
        );
      }
    );
  }
  private _generateItemsOrderLoader() {
    return new DataLoader<number, ItemsOrder[]>(
      async (keys: readonly number[]) => {
        const itemsOrder = await this.itemsOrderService.getItemsOfOrderByBatch(
          keys as number[]
        );
        console.log("itemsOrder", itemsOrder);

        return itemsOrder.map((itemsOrderArray) =>
          itemsOrderArray.map((itemOrder) => itemOrder)
        );
      }
    );
  }
}
