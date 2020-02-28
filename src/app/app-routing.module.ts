import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OauthComponent} from './oauth/oauth.component';
import {TransferSelfComponent} from './transfer-self/transfer-self.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: 'login', component: OauthComponent},
  {path: 'logout', component: OauthComponent},
  {path: 'transfer-self', component: TransferSelfComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
