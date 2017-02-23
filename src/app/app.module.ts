import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { SquadService } from './squad.service';
import { ProfileComponent } from './profile/profile.component';
import { RootComponent } from './root/root.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/appComponent', pathMatch: 'full' },
  { path: 'appComponent', component: AppComponent },
  { path: 'login', component: RootComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RootComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SquadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
