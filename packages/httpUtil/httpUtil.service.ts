import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Item } from "apps/items/src/items/item.entity";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HttpUtilService {
  constructor(private readonly httpService: HttpService) {}
  async getItemByIdFromItems(itemId: number): Promise<Item> {
    const query = `
      query {
        getItemById(id: ${itemId}) {
          id
          name
          price
          uploadDate
          description
          sellerName
          status
          categories {
            id
            name
          }
        }
      }
    `;

    return (
      await firstValueFrom(
        this.httpService.post(process.env.ITEMS_URL, { query })
      )
    ).data.data;
  }
}
