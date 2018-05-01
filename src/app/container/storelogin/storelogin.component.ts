import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-storelogin',
  templateUrl: './storelogin.component.html',
  styleUrls: ['./storelogin.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('slidInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)', 'opacity': 1 }),
        animate('500ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 })
        )])
    ])
  ],
  providers: [UserService]
})
export class StoreloginComponent implements OnInit {
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  public show = true;
  public show2 = false;
  public autologin = false;
  private account: string = 'a001';
  private password: string = '123456';
  public student: string;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.student = this.router.parseUrl(this.router.url).queryParams['childid'];
    if (Cookie.get('storeCookie')) {
      this.show = false;
      this.autologin = true;
      setTimeout(() => {
        this.show2 = true;
        this.router.navigate(["studentlogin"], { queryParams: { childid: this.student } });
      }, 500);
    } else {
      this.autologin = false;
    }
  }

  public StartClick() {
    this.show = false;
    setTimeout(() => {
      this.show2 = true;
    }, 500);
  }

  public async LoginClick() {
    const body = {
      userId: this.account,
      userPwd: this.password
    };

    await this.userService.Login(body).subscribe(
      result => {
        if (result.token) {
          Cookie.set('storeCookie', result.token, 365000, '/');
          this.router.navigate(['/studentlogin']);
        } else {
          this.swalDialogError.show();
        }
      }
    )
  }

}
