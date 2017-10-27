import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  private items: any[] = [];
  private currentUser = {};
  private item_error = [];
  private destroy_error = [];
  private default = "https://renderman.pixar.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
  private input = {
    key: ''
  };

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
    this._itemService.getItems()
    .then(data => {
      this.items = data;
      for (let item of this.items){
        item.display = false;
      }
    })
    .catch(err => {
      this.item_error = [err];
    });
  }

  alertUserInfo(idx) {
    this.items[idx].display = true;
  }

  hideUserInfo(idx) {
    this.items[idx].display = false;
  }

  destroyItem(id: string, idx) {
    return this._itemService.destroyItem(id)
    .then(item => {
      if (item.message) {
        this.destroy_error = [item.message];
      } else {
        this.items.splice(idx, 1);
      }
    })
    .catch(err => {
      this.destroy_error = [err];
    });
  }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/');
  }

}
