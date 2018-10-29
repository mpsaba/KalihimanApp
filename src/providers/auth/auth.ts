import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afDatabase: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }


  create(){
    let param = {
      accessCode: '123abc'
    }

    this.afDatabase.list('users').push(param)
  }

}
