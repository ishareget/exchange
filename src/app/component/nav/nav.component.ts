import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ],
  providers: [UserService]
})
export class NavComponent implements OnInit {

  public img: any = '';

  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) { }
  public step = 1;
  public student: any;
  ngOnInit() {
    this.router.url.forEach(params => {
      if (params[0].path === 'store') {
        this.getStudent();
      } else {
        this.step = 1;
        console.log(this.step)
      }
      window.scroll(0, 0);
    });
  }

  public async getStudent() {
    await this.userService.StudentuserInfo().subscribe(result => {
      this.student = result[0];
      this.step = 2;
      this.img = this.student.picture;
    })

  }
}
