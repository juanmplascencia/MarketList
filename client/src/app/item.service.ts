import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class ItemService {

  constructor(private _http: Http) { }

  getItems() {
    return this._http.get('/items')
    .map(data => data.json())
    .toPromise();
  }

  updateItem(item) {
    return this._http.patch(`/items/${item._id}`, item)
    .map(data => data.json())
    .toPromise();
  }

  destroyItem(id: string) {
    return this._http.delete(`/items/${id}`)
    .map(data => data.json())
    .toPromise();
  }

  createItem(newItem) {
    return this._http.post('/items', newItem)
    .map(data => data.json())
    .toPromise();
  }

  textItem(id) {
    console.log(id);
    return this._http.get(`/items/${id}/text`)
    .map(data => data.json())
    .toPromise();
  }

}
