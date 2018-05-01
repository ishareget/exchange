import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

declare var Materialize: any;
declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css'],
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
export class StudentloginComponent implements OnInit {
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  public stu_account = '';
  public stu_password = '123456';
  public stu = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const storeCookie = Cookie.get('storeCookie');
    if (!storeCookie) {
      this.router.navigate(['/storelogin']);
    }
    setTimeout(function () { $('.acount label').addClass('active'); }, 1);
    if (this.router.parseUrl(this.router.url).queryParams['childid']) {
      this.stu_account = this.router.parseUrl(this.router.url).queryParams['childid'];
    }
    this.router.parseUrl(this.router.url).queryParams['childid'] ? this.stu = true : this.stu = false;
  }

  public async LoginClick() {
    const body = {
      userId: this.stu_account,
      userPwd: this.stu_password
    };

    await this.userService.Login(body).subscribe(
      result => {
        if (result.token) {
          Cookie.set('studentCookie', result.token, 365000, '/');
          this.router.navigate(['/store']);
        } else {
          this.swalDialogError.show();
        }
      }
    )
  }
}
