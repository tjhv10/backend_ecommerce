import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Item } from "apps/items/src/items/item.entity";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HttpUtilService {
  constructor(private readonly httpService: HttpService) {}
  async getItemByIdFromItems(item_id: number): Promise<Item> {
    const query = `
      query {
        getItemById(id: ${item_id}) {
          id
          name
          price
          upload_date
          description
          seller_name
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
