import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  /**
 * Token打包
 *
 * @memberof UserService
 */
  public packToken() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + Cookie.get('storeCookie'));
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  /**
  * Token打包
  *
  * @memberof UserService
  */
  public packToken2() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + Cookie.get('studentCookie'));
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  /**
   * 登入
   *
   * @param body
   * @memberof UserService
   */
  public Login(body: object) {
    console.log(body);
    return this.http.post('/api/user/login', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 使用者資訊
   *
   * @memberof UserService
   */
  public StudentuserInfo() {
    return this.http.get('/api/user/userinfo', this.packToken2())
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 使用者資訊
   *
   * @memberof UserService
   */
  public userInfo() {
    return this.http.get('/api/user/userinfo', this.packToken())
      .map((res) => {
        return res.json() || {}
      });
  }

  public Studentupdate(body) {
    return this.http.post('/api/user/update', body, this.packToken2())
      .map((res) => {
        return res.json() || {}
      });
  }

  public RecordCreate(body) {
    console.log(body)
    return this.http.post('/api/record/create', body, this.packToken2())
      .map((res) => {
        return res.json() || {}
      });
  }


}
