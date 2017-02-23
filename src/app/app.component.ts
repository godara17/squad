import { Component, OnInit } from '@angular/core'
import { Routes, RouterModule, Router }   from '@angular/router'
import { SquadService } from './squad.service'
import { ProfileComponent } from './profile/profile.component'
import { RootComponent } from './root/root.component'

const routes: Routes = [
  { path: '', redirectTo: '/appComponent', pathMatch: 'full' },
  { path: 'appComponent', component: AppComponent },
  { path: 'login', component: RootComponent }
];

@Component({
  selector: 'app-comp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title  = 'Squad User Portal'

  constructor(squadService: SquadService, private router: Router) {
    this.router.navigate(['login'])
  }

  ngOnInit() {}
}
