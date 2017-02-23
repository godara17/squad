import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router }   from '@angular/router'
import { SquadService } from './../squad.service'
import { ProfileComponent } from './../profile/profile.component'
import { RootComponent } from './../root/root.component'
import { User } from './../squad.service'

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: RootComponent }
];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private confPass: any
  private user    : User 
  private displayErr
  private error
  squadService
  
  constructor(squadService: SquadService, private router: Router) {
    this.squadService = squadService
    this.displayErr  = false
    this.user         = new User()
  }

  ngOnInit() {
  }

  validateFields() {
    const _    = this
    let retObj = {
      status: '',
      err   : ''
    }

    if (!_.user.fName){
      retObj.status = 'invalid'
      retObj.err = 'Enter First Name'
      return retObj
    }

    if (!_.user.lName){
      retObj.status = 'invalid'
      retObj.err = 'Enter Last Name'
      return retObj
    }

    if (!_.user.emailID){
      retObj.status = 'invalid'
      retObj.err = 'Enter Email Id'
      return retObj
    }

    if (!_.user.pass){
      retObj.status = 'invalid'
      retObj.err = 'Enter pass'
      return retObj
    }

    if (!_.user.mobileNo){
      retObj.status = 'invalid'
      retObj.err = 'Enter mobile Number'
      return retObj
    }

    if (!_.user.gender){
      retObj.status = 'invalid'
      retObj.err = 'Enter Gender'
      return retObj
    }

    if (!_.user.age){
      retObj.status = 'invalid'
      retObj.err = 'Enter Age'
      return retObj
    }

    return {status: 'success', err: ''}
  }

  handleSignUp() {
    const _    = this
    let valRes =  _.validateFields()

    if (valRes.status === 'invalid') {
      _.error = valRes.err
      return _.displayErr = true
    }

    if (_.user.pass != _.confPass) {
      _.error = "passwords does not match"
      return _.displayErr = true
    }

    _.squadService.signup(_.user).then((res) => {
      if (res === 'success') _.router.navigate(['profile'])
      else if (res === 'failure') {
        _.displayErr = true
        _.error      = 'signUp failure'
      } else {
      _.error      = res.error
      _.displayErr = true
      }
    })
  }

  onLogin() {
    const _ = this
    return _.router.navigate(['login'])
  }
}
