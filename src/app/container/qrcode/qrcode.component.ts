import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
  providers: [UserService]
})
export class QrcodeComponent implements OnInit {
  public step = 1;
  public student: string;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.student = this.router.parseUrl(this.router.url).queryParams['childid'];
    if (Cookie.get('storeCookie')) {
      this.check();
    } else {
      this.router.navigate(["storelogin"], { queryParams: { childid: this.student } });
    }
  }
  public async check() {
    await this.userService.userInfo().subscribe(result => {
      if (result.length !== undefined) {
        setTimeout(() => {
          this.step = 2;
          setTimeout(() => {
            this.router.navigate(["studentlogin"], { queryParams: { childid: this.student } });
          }, 1000);
        }, 1000);
      } else {
        this.router.navigate(["storelogin"], { queryParams: { childid: this.student } });
      }
    }, err => {
      console.log(err);
      Cookie.delete('storeCookie', '/');
      this.router.navigate(["storelogin"], { queryParams: { childid: this.student } });
    });
  }
}
