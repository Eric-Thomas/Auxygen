import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LeaderComponent } from './components/leader/leader.component';
import { CallbackComponent } from './components/callback/callback.component';
import { QueueComponent } from './components/queue/queue.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'leader', component: LeaderComponent },
  { path: 'leader/:username', component: QueueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
