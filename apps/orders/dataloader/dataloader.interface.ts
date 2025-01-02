import DataLoader from "dataloader";
import { ItemsOrder } from "apps/orders/src/items_order/ItemOrder.entity";

export interface IDataloaders {
  itemsOrderLoader: DataLoader<number, ItemsOrder[]>;
}
