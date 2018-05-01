import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { StoreloginComponent } from './container/storelogin/storelogin.component';
import { StudentloginComponent } from './container/studentlogin/studentlogin.component';
import { QrcodeComponent } from './container/qrcode/qrcode.component';
import { StoreComponent } from './container/store/store.component';
import { ResultComponent } from './container/result/result.component';

const routes: Routes = [
  { path: 'storelogin', component: StoreloginComponent },
  { path: 'studentlogin', component: StudentloginComponent },
  { path: 'qrcode', component: QrcodeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'result', component: ResultComponent },
  
  { path: '', redirectTo: '/storelogin', pathMatch: 'full' },
  { path: '**', redirectTo: '/storelogin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

