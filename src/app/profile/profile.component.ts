import { Component, OnInit } from '@angular/core'
import { Routes, RouterModule, Router }   from '@angular/router'
import { SquadService } from './../squad.service'
import { User } from './../squad.service'
import { RootComponent } from './../root/root.component'

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: RootComponent }
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  squadService : any
  private user : User

  constructor(squadService: SquadService, private router: Router) {
    this.squadService = squadService
    this.user         = new User()
    this.init()
  }

  ngOnInit() {}

  init() {
    const _ = this

    _.squadService.getUserProfile().then((res) => {
      if (res === 'reLogin') _.router.navigate(['login'])
      _.user = res
    })
  }
  
  onLogout() {
    const _ = this
    let result = _.squadService.onLogout()
    _.user = new User()
    _.router.navigate(['login'])
  }
}