import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  items: any[] = [];
  currentUser = {};

  constructor(
    private _itemService: ItemService,
    private _userService: UserService,
    private _router: Router) {
    this.currentUser = this._userService.getCurrentUser();
    this.getItems();
   }

  ngOnInit() {
  }

  getItems() {
    return this._itemService.getItems()
    .then(data => {
      console.log(data);
      this.items = data;
      for (let item of this.items){
        item.display = false;
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  alertUserInfo(idx) {
    this.items[idx].display = true;
  }

  hideUserInfo(idx) {
    this.items[idx].display = false;
  }

  destroyBike(id: string, idx) {
    return this._itemService.destroyItem(id)
    .then(bike => {
      this.items.splice(idx, 1);
    })
    .catch(err => {
      console.log(err);
    });
  }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/');
  }


}
