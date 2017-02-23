import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router }   from '@angular/router'
import { SquadService } from './../squad.service'
import { ProfileComponent } from './../profile/profile.component'
import { User } from './../squad.service'

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent }
];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private confPass: any
  private user    : User 
  private invalidPass
  squadService
  
  constructor(squadService: SquadService, private router: Router) {
    this.squadService = squadService
    this.invalidPass  = false
    this.user         = new User()
  }

  ngOnInit() {
  }

  handleSignUp() {
    const _  = this

    if (_.user.pass != _.confPass) {
      return _.invalidPass = true
    }
    
    _.squadService.signup(_.user).then((res) => {
      if (res === 'success') _.router.navigate(['profile'])
    })
  }
}
