import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';

import { enableProdMode } from '@angular/core';

// Plugin
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { StoreloginComponent } from './container/storelogin/storelogin.component';

import { StudentloginComponent } from './container/studentlogin/studentlogin.component';
import { QrcodeComponent } from './container/qrcode/qrcode.component';
import { StoreComponent } from './container/store/store.component';
import { ResultComponent } from './container/result/result.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StoreloginComponent,
    StudentloginComponent,
    QrcodeComponent,
    StoreComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterializeModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
