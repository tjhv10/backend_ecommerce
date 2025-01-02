import DataLoader from "dataloader";
import { Category } from "../category/categories.entity";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";
import { Items } from "../item/items.entity";

export interface IDataloaders {
  itemCategoryLoader: DataLoader<number, Category[]>;
  itemsOrderLoader: DataLoader<number, ItemsOrder[]>;
}
