import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { MemberProvider } from '../../providers/member/member';
import { GroupDashboardPage } from '../group-dashboard/group-dashboard';


@IonicPage()
@Component({
  selector: 'page-coding',
  templateUrl: 'coding.html',
})
export class CodingPage {

  displayGroup: any = []; //by 2 per purok
  perPurokGroups: any = []; //per purok
  topItems: any = [];
  otherTopItems: any = [];
  weekNo: any;
  day: any;
  type: any;
  membersAttendance: any;

  loading: any;
  codes: any = {};

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public memberProvider: MemberProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }


  ionViewWillEnter() {

    this.init();

    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Coding for the week',
      inputs: [
        {
          name: 'weekNo',
          placeholder: 'Week number',
          type: 'number'
        },
        {
          name: 'day',
          placeholder: 'T(thursday) / S(sunday)'
        }
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: data => {
            if (data.weekNo && data.day && (data.day.toUpperCase() === 'S' || data.day.toUpperCase() === 'T')) {
              this.day = data.day.toUpperCase();
              this.weekNo = data.weekNo;

              this.displayDashboard();
            } else {
              let toast = this.toastCtrl.create({
                message: "Please enter week number and day.",
                duration: 1000,
                position: 'bottom'
              });

              toast.present();
              return false;
            }
          }
        }
      ]
    });

    alert.present();
  }

  init() {

    this.membersAttendance = [];
    this.topItems = [];
    this.otherTopItems = [];
    this.displayGroup = [];
    this.perPurokGroups = [];

    for (let i: number = 0; i < 28; i++) {
      this.perPurokGroups[i] = [{ groupNo: i + 1 }];
    }

    this.codes['1'] = {};
    this.codes['2'] = {};
    this.codes['A'] = {};
    this.codes['B'] = {};
    this.codes['C'] = {};
    this.codes['D'] = {};
    this.codes['E'] = {};
    this.codes['F'] = {};
    this.codes['G'] = {};
    this.codes['H'] = {};
    this.codes['I'] = {};
    this.codes['J'] = {};
    this.codes['K'] = {};
    this.codes['L'] = {};
    this.codes['M'] = {};
    this.codes['N'] = {};
    this.codes['X'] = {};

  }

  displayDashboard() {

    this.showLoading("Loading dashboard...");

    let totalCount = 0;
    let binCount = 0;
    let kadCount = 0;
    let bukCount = 0;
    let msCount = 0;
    let uwpCount = 0;

    if (localStorage.getItem('attendance' + this.weekNo + "" + this.day)) {
      this.membersAttendance = JSON.parse(localStorage.getItem('attendance' + this.weekNo + "" + this.day)).allCheckedMembers;
    }

    if (localStorage.getItem("coding" + this.weekNo + "" + this.day)) {

      let checkedMembersObject = JSON.parse(localStorage.getItem("coding" + this.weekNo + "" + this.day)).allCheckedMembers;
      let codingMembersObject = JSON.parse(localStorage.getItem("coding" + this.weekNo + "" + this.day)).allCheckedMembers;

      Object.keys(this.membersAttendance).forEach(key => {
        this.membersAttendance[key].forEach(elementA => {

          let code = 'X';

          Object.keys(codingMembersObject).forEach(key => {
            codingMembersObject[key].forEach(elementC => {
              if (elementA.firstName === elementC.firstName && elementA.lastName === elementC.lastName) {
                code = elementC.code;
              }
            });
          });

          if (this.codes[code].count) {
            this.codes[code] = {
              count: this.codes[code].count + 1
            }
          } else {
            this.codes[code] = {
              count: 1
            }
          }
          
          if (elementA.displayName && this.perPurokGroups.length === 1) {
            this.perPurokGroups[parseInt(elementA.groupNo) - 1] = [];
          }


          this.perPurokGroups[parseInt(elementA.groupNo) - 1].push({
            firstName: elementA.firstName,
            lastName: elementA.lastName,
            phoneNo: elementA.phoneNo,
            address: elementA.address,
            gender: elementA.gender,
            displayName: elementA.firstName + " " + elementA.lastName,
            kapisanan: elementA.kapisanan,
            groupNo: elementA.groupNo,
            status: elementA.status,
            code: code
          });
        });
      });


      let total = 0;
      let otherLokal = 0;
      let didNot = 0;

      Object.keys(this.codes).forEach(key => {
        if (this.codes[key].hasOwnProperty('count') && key != 'X') {

          total += this.codes[key].count;

          if (key === '1' || key === '2') {
            otherLokal += this.codes[key].count;
          } else {
            didNot += this.codes[key].count;
          }

          this.topItems.push({
            code: key,
            count: this.codes[key].count
          });
        }
      });

      this.otherTopItems.push(
        {
          code: 'Codes',
          count: didNot
        }, {
          code: 'Other Lokal',
          count: otherLokal
        }, {
          code: 'Total',
          count: total
        })

    } else if (JSON.parse(localStorage.getItem('attendance' + this.weekNo + "" + this.day))) {

      let checkedMembersObject = this.membersAttendance;

      Object.keys(checkedMembersObject).forEach(key => {
        checkedMembersObject[key].forEach(element => {
          totalCount++;

          let color: any;
          if (element.kapisanan === 'Binhi') {
            binCount++;
            color = "blue"
          }
          else if (element.kapisanan === 'Kadiwa') {
            kadCount++;
            color = "red"
          }
          else if (element.kapisanan === 'Buklod') {
            bukCount++;
            color = "green"
          }

          if (element.status == 1) {
            msCount++;
          }
          else if (element.status == 2) {
            uwpCount++;
          }

          this.perPurokGroups[parseInt(element.groupNo) - 1].push({
            firstName: element.firstName,
            lastName: element.lastName,
            phoneNo: element.phoneNo,
            address: element.address,
            gender: element.gender,
            displayName: element.firstName + " " + element.lastName,
            color: color,
            kapisanan: element.kapisanan,
            groupNo: element.groupNo,
            status: element.status,
            code: element.code
          });
        });
      });

    }

    let counter = 0;
    for (let i = 0; i < this.perPurokGroups.length; i += 2) {
      this.displayGroup[counter] = [
        this.perPurokGroups[i],
        this.perPurokGroups[i + 1]
      ];

      counter++;
    }

    setTimeout(() => {
      this.hideLoading();
    }, 3000)

  }

  selectGroup(i, x) {

    let group = [];
    let groupNo: any;

    switch (i) {
      case 0:
        groupNo = x == 0 ? 1 : 2;
        break;
      case 1:
        groupNo = x == 0 ? 3 : 4;
        break;
      case 2:
        groupNo = x == 0 ? 5 : 6;
        break;
      case 3:
        groupNo = x == 0 ? 7 : 8;
        break;
      case 4:
        groupNo = x == 0 ? 9 : 10;
        break;
      case 5:
        groupNo = x == 0 ? 11 : 12;
        break;
      case 6:
        groupNo = x == 0 ? 13 : 14;
        break;
      case 7:
        groupNo = x == 0 ? 15 : 16;
        break;
      case 8:
        groupNo = x == 0 ? 17 : 18;
        break;
      case 9:
        groupNo = x == 0 ? 19 : 20;
        break;
      case 10:
        groupNo = x == 0 ? 21 : 22;
        break;
      case 11:
        groupNo = x == 0 ? 23 : 24;
        break;
      case 12:
        groupNo = x == 0 ? 25 : 26;
        break;
      case 13:
        groupNo = x == 0 ? 27 : 28;
        break;
    }

    if (this.membersAttendance[groupNo]) {
      this.membersAttendance[groupNo].forEach(element => {
        if (element.groupNo == groupNo) {
          group.push({
            firstName: element.firstName,
            lastName: element.lastName,
            phoneNo: element.phoneNo,
            address: element.address,
            gender: element.gender,
            displayName: element.firstName + " " + element.lastName,
            kapisanan: element.kapisanan,
            groupNo: element.groupNo,
            status: element.status
          });
        }
      });

      this.showModal(group);
    } else {
      let toast = this.toastCtrl.create({
        message: "No attendance record for group " + groupNo,
        duration: 2000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  showModal(group) {
    const modal = this.modalCtrl.create(GroupDashboardPage, { group: group, weekNo: this.weekNo, day: this.day, type: "coding" });

    modal.present();

    modal.onDidDismiss(data => {

      this.init();
      this.weekNo = data;
      this.displayDashboard();

    });
  }


  showLoading(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = undefined;
    }
  }

}
