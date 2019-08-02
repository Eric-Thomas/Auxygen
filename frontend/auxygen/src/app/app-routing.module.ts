import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LeaderComponent } from './components/leader/leader.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'leader', component: LeaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
