import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() createUserEvent = new EventEmitter;

  private loginUser = {};
  private newUser = {};
  loginErrors = [];

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(loginUser) {
    this._userService.authenticate(loginUser)
    .then(user => {
          if(user.errors){
            this.loginErrors.push(user.errors.login.message);
          }
          else {
            this._userService.storeCurrentUser(user);
            this._router.navigateByUrl('/dashboard');
          }

     })
    .catch(err => { console.warn(err);
    });
  }

  createUser(newUser) {
    this._userService.create(newUser)
    .then(user => {
        this._userService.storeCurrentUser(user);
        this._router.navigateByUrl('/dashboard');
    })
    .catch(err => { console.warn(err);
    });
  }
}
