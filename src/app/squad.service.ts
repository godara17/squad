import { Injectable, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RootComponent } from './root/root.component';

export class User {
  fName   : 'string'
  lName   : 'string'
  emailID : any
  pass    : any
  mobileNo: any
  gender  : 'string'
  age     : any

  constructor() {
  }
}

@Injectable()
export class SquadService{

  private user       : User
  private isLoggedIn : any
  private userID     : any
  private pass       : any

  constructor(private http: Http) {
    this.user       = new User
    this.isLoggedIn = false
  }

  getUserProfile() {
    const _ = this

    if (_.isLoggedIn) {
      return Promise.resolve(_.user)
    }

    return Promise.resolve('reLogin')
  }

  onLogout() {
    const _      = this
    _.user       = new User()
    _.isLoggedIn = false
    _.userID     = ''
    _.pass       = ''
    return 'success'
  }

  getUser(userID, pass) {
    const _     = this
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    let param = {
      emailID: userID,
      pass   : pass
    }

    return _.http.post('/getuser', JSON.stringify({"param": param}), options)
                      .toPromise()
                      .then((res) => {
                        let body = res.json()
                        if (body.error) return {error: body.error}
                        else if (body.mongoError) return {error: body.mongoError}
                        else if (body.loginError) return {error: body.loginError}
                        _.user       = body.data
                        _.userID     = userID
                        _.pass       = pass
                        _.isLoggedIn = true
                        return true
                      })
  }

  signup(user) {
    const _   = this
    this.user = user

    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return _.http.post('/signup', JSON.stringify({"param": this.user}), options)
                  .toPromise()
                  .then((res) => {
                    let body = res.json()
                    if (body.error) return {error: body.error}
                    else if (body.mongoError) return {error: body.mongoError}
                    let data = body.data
                    if (data != 'success') return _.removeUser()
                    _.isLoggedIn = true
                    return data
                  })
  }

  // extractData(res) {
  //   const _ = this
  //   console.log('extracting data')
  //   console.log(this)
  //   let body = res.json()
  //   console.log(body)
  //   if (body.error) return {error: body.error}
  //   else if (body.mongoError) return {error: body.mongoError}
  //   let data = body.data
  //   // console.log(this)
  //   console.log('return')
  //   if (data != 'success') _.removeUser()
  //   console.log(this.user)
  //   _.isLoggedIn = true
  //   // _.serverProfile = data
  //   return data
  // }

  removeUser() {
    const _ = this
    _.user       = new User()
    _.userID     = ''
    _.pass       = ''
    _.isLoggedIn = false

    return Promise.resolve('failure')
  }
}