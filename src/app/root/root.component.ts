import { Component, OnInit } from '@angular/core'
import { Routes, RouterModule, Router }   from '@angular/router'
import { SquadService } from './../squad.service'
import { ProfileComponent } from './../profile/profile.component'
import { SignupComponent } from './../signup/signup.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: RootComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent }
];

@Component({
  selector   : 'app-root',
  templateUrl: './root.component.html',
  styleUrls  : ['./root.component.css']
})

export class RootComponent implements OnInit{
  userID             : any
  pass               : any 
  squadService       : any
  private isLoggedIn : any
  displayErr         : any
  error              : any

  constructor(squadService: SquadService, private router: Router) {
    this.squadService = squadService
    this.displayErr   = false
  }

  ngOnInit() {
    this.isLoggedIn = false
  }

  handleLogin() {
    const _ = this
    _.squadService.getUser(_.userID, _.pass).then((res) => {
      if (res === true) {
        _.isLoggedIn = res
        return _.router.navigate(['profile'])
      }
      _.displayErr = true
      _.error      = res.error
      _.userID     = ''
      _.pass       = ''
    })
  }

  handleSignUp() {
    const _ = this
    _.router.navigate(['signup'])
  }
}