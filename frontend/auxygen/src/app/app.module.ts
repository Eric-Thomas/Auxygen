import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LeaderComponent } from './components/leader/leader.component';
import { CallbackComponent } from './components/callback/callback.component';
import { QueueComponent } from './components/queue/queue.component';
import { LeaderFormComponent } from './components/leader-form/leader-form.component';
import { LeaderService } from './services/leader.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LeaderComponent,
    CallbackComponent,
    QueueComponent,
    LeaderFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
