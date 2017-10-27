import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  newItem = {};
  currentUser = {_id: 0, items: []};
  itemErrors: string[] = [];
  displayItem = {};

  constructor(
    private _itemService: ItemService,
    private _userService: UserService,
    private _router: Router) {
    this.setCurrentUser();
    this._userService.show(this.currentUser._id)
    .then(user => { this.currentUser = user; })
    .catch(err => { console.log(err); });
  }

  ngOnInit() {
  }

  setCurrentUser() {
    this.currentUser = this._userService.getCurrentUser();
  }

  destroyItem(id: string, idx) {
    this._itemService.destroyItem(id)
    .then(item => {
      this.currentUser.items.splice(idx, 1);
    })
    .catch(err => {
      console.log(err);
    });
  }

  logout() {
  this._userService.logout();
  this._router.navigateByUrl('/');
  }

  updateItem(item) {
    this._itemService.updateItem(item)
    .then(item => {
      this._router.navigateByUrl('dashboard');
    })
    .catch(err => {
      console.log(err);
    });
  }

  createItem(newItem) {
    newItem.user = this.currentUser._id;
    this._itemService.createItem(newItem)
    .then(item => {
      this.currentUser.items.push(item);
      this._router.navigateByUrl('dashboard');
    })
    .catch(err => {
      console.log(err);
    });
  }

}
