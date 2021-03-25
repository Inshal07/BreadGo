import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoCharityComponent } from './do-charity/do-charity.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard,  redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { HistoryComponent } from './history/history.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectloggedInTodo = () => redirectLoggedInTo(['do'])
const redirectloggedInToprofile = () => redirectLoggedInTo(['profile'])
const routes: Routes = [
  {
    path:'login', component:LoginComponent,  canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectloggedInTodo }
  },
  {
    path: '', component:HomeComponent
  },
  {
    path:'nav', component:NavComponent
  },
  {
    path:'do', component:DoCharityComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path:'profile', component:ProfileComponent, canActivate: [AngularFireAuthGuard],  data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path:'history', component:HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
