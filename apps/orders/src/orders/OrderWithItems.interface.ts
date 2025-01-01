import { Items } from "../../../items/src/item/items.entity";
import { Orders } from "./order.entity";

export interface OrderWithItems extends Orders {
  items: Items[];
}
