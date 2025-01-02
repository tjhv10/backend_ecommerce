import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Items } from "./items.entity";
import { Repository } from "typeorm";
import { ItemStatus } from "../../../../packages/enum/items-status.enum";
// import { ItemStatus } from '../../../item_status';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Items)
    private itemRepository: Repository<Items>
  ) {}
  async getItems(): Promise<Items[]> {
    return await this.itemRepository.find({
      where: { status: ItemStatus.ACTIVE },
    });
  }
  async getItemById(id: number): Promise<Items> {
    const found = await this.itemRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `Item not found by id "${id}", id doesnt exist`
      );
    } else return found;
  }

  async isIdExist(id: number): Promise<boolean> {
    const found = await this.itemRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `Item not found by id "${id}", id doesnt exist`
      );
    } else return true;
  }

  async deleteItem(id: number) {
    const item = this.getItemById(id);
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return item;
  }

  async updateItemStatus(id: number, status: ItemStatus): Promise<Items> {
    const item = await this.getItemById(id);
    item.status = status;
    return this.itemRepository.save(item);
  }

  async updateItemPrice(id: number, price: number): Promise<Items> {
    const item = await this.getItemById(id);
    item.price = price;
    return this.itemRepository.save(item);
  }
}
