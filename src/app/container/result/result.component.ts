import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
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
export class ResultComponent implements OnInit {
  public isLoading = true;
  public item: any;
  public student: string;
  public path: any;
  public point: string;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.path = this.router.parseUrl(this.router.url).queryParams['path'];
    this.item = JSON.parse(this.router.parseUrl(this.router.url).queryParams['item']);
    this.student = this.router.parseUrl(this.router.url).queryParams['student'];
    this.point = this.router.parseUrl(this.router.url).queryParams['point'];
    Cookie.delete('studentCookie','/');
  }

}
