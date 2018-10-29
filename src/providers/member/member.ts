import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppSettings } from '../../app/app.settings';
import 'rxjs/add/operator/map'
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class MemberProvider {

  constructor(public http: Http, public afDatabase: AngularFireDatabase) {
    console.log('Hello MemberProvider Provider');
  }

  getFormGoogleSheet() {
    return new Promise((resolve, reject) => {
      this.http.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vSkXqrt1wFneG9OBH5Zcx3iI2SnxVdnF6sjHCeMuzTqEcbqD_a2oRbZIZhCrjmM5KXPu6Rx0sJvSy3W/pub?gid=0&single=true&output=csv")
        .subscribe(data => {
          var toArray = data.text().split("\n");
          resolve(toArray);
        }, error => {
          reject(error)
        });
    });
  }

  getSNumber() {
    return new Promise((resolve, reject) => {
      this.http.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vSW6wfswS71SsnTLkui2l9KbBgDY1RN81Zwv0g9rcKzYKm3eOAkRZiqyxnJ5tmk-4v7ctIk3dupxMaf/pub?output=csv")
        .subscribe(data => {
          var toArray = data.text().split("\n");
          resolve(toArray);
        }, error => {
          reject(error)
        });
    });
  }

  getMembers() {
    return new Promise((resolve, reject) => {
      this.afDatabase.object('members').valueChanges().subscribe(snapshot => {

        let membersArr = [];

        Object.keys(snapshot).forEach(key => {
          membersArr.push({
            id: key,
            lastName: snapshot[key].lastName,
            firstName: snapshot[key].firstName,
            phoneNo: snapshot[key].phoneNo,
            address: snapshot[key].address,
            gender: snapshot[key].gender,
            kapisanan: snapshot[key].kapisanan,
            groupNo: snapshot[key].groupNo,
            status: snapshot[key].status,
            bday: snapshot[key].bday,
            katiwala: snapshot[key].katiwala,
            tungkulin: snapshot[key].tungkulin,
            remarks: snapshot[key].remarks
          })
        });

        resolve(membersArr);

      }, error => {
        reject(error)
      });
    });
  }

  addMember(member) {
    return new Promise((resolve, reject) => {
      this.afDatabase.list('members').push(member)
      resolve("success")
    });
  }

  update(member) {
    return new Promise((resolve, reject) => {
      this.afDatabase.database.ref().child('members/' + member.id).set(member);
      resolve("success")
    });

  }

  setMembers(members) {
    // this.afDatabase.list('members').push({member});
    this.afDatabase.object('members').set(members)
  }

}
