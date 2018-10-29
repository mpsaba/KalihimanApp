import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PercentageProvider {

  constructor(public afDatabase: AngularFireDatabase) {
    console.log('Hello PercentageProvider Provider');
  }

  getAttendance(weekNo) {
    this.afDatabase.object('attendance/20').valueChanges().subscribe(snapshot => {
      console.log(snapshot)
      return "here"
    }, error => {
      console.log(error)
    });
  }

  setAttendance() {
    this.afDatabase.list('attendance/20/sunday').push({
      id: "-LDuGHFTgAlDKj9aqaxH",
      firstName: "Orlando Jr.",
      lastName: "Bucu",
      status: "",
      code: ""
    })
  }

  update() {
    this.afDatabase.database.ref().child('attendance/20/sunday/-LDzeACF27NZs84nHe2p').update({ code: "B" });
  }

}
