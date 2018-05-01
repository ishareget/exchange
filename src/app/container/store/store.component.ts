import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { SwalComponent } from "@toverux/ngx-sweetalert2";

import * as moment from 'moment';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
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
export class StoreComponent implements OnInit {
  @ViewChild('dialogError') private SwaldialogError: SwalComponent;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  public store: any;
  public isLoading = false;
  public item = [{ id: 1, name: '麻辣鴨血', point: 20, picture: 'http://www.walkerland.com.tw/image/size200/subject/4513becd5b150ffe37ec55045ffa2c3167689c64.jpg' }, { id: 2, name: '八塊大雞桶', point: 20, picture: 'http://www.walkerland.com.tw/image/size200/subject/4513becd5b150ffe37ec55045ffa2c3167689c64.jpg' }, { id: 3, name: '超滿足老爺吃到飽套餐', point: 20, picture: 'http://www.walkerland.com.tw/image/size200/subject/4513becd5b150ffe37ec55045ffa2c3167689c64.jpg' }]
  private student: any;
  public studentPoint: Number;

  ngOnInit() {
    this.getStoreUserInfo();
  }

  public async getStoreUserInfo() {
    await this.userService.userInfo().subscribe(result => {
      this.store = result[0];
      this.studentUserInfo();
      setTimeout(() => {
        this.isLoading = true;
      }, 500);
    });
  }

  public async exchange(value) {
    const body = {
      recordchild: this.student.username,
      recordpoint: this.student.point - value.point,
      recordcost: value.point,
      recordstore: this.store.username,
      recordtime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    this.studentPoint = body.recordpoint;
    if (body.recordpoint < 0) {
      // this.router.navigate(["result"], { queryParams: { path: 2 } });  // 點數不足
      this.SwaldialogError.show();
    } else {
      await this.userService.RecordCreate(body).subscribe(result => {
        if (result.changedRows !== 0) {
          this.updateStudentPoint();
          this.router.navigate(["result"], { queryParams: { path: 1, item: JSON.stringify(value), student: this.student.name, point: body.recordpoint } });  //兌換成功
        } else {
          this.router.navigate(["result"], { queryParams: { path: 3 } });  //兌換失敗
        }
      })
    }
  }

  public async studentUserInfo() {
    await this.userService.StudentuserInfo().subscribe(result => {
      this.student = result[0];
    }, err => {
      this.router.navigate(["studentlogin"]);
    })
  }

  public async updateStudentPoint() {
    const body2 = {
      username: this.student.username,
      point: this.studentPoint
    }
    this.userService.Studentupdate(body2).subscribe(
      result => {
        if (result) {

        } else {

        }
      }
    )
  }

  public null() {
    console.log("難過  居然不兌換我")
  }
}
