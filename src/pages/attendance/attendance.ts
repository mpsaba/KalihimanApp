import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { GroupDashboardPage } from '../group-dashboard/group-dashboard';


@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  displayGroup: any = []; //by 2 per purok
  perPurokGroups: any = []; //per purok
  topItems: any = {};
  weekNo: any;
  day: any;

  loading: any;

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    console.log("AttendancePage");
  }

  init() {

    this.displayGroup = [];
    this.perPurokGroups = [];

    for (let i: number = 0; i < 28; i++) {
      this.perPurokGroups[i] = [{ groupNo: i + 1 }];
    }

    this.topItems = {};
  }


  ionViewWillEnter() {
    // this.percentageProvider.getAttendance();
    this.init();

    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Attendance for the week',
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
            console.log(data.weekNo)
          }
        }
      ]
    });
    alert.present();
  }

  displayDashboard() {

    this.showLoading("Loading dashboard...");

    let totalCount = 0;
    let binCount = 0;
    let kadCount = 0;
    let bukCount = 0;
    let msCount = 0;
    let uwpCount = 0;

    if (localStorage.getItem("attendance" + this.weekNo + "" + this.day)) {

      let checkedMembersObject = JSON.parse(localStorage.getItem("attendance" + this.weekNo + "" + this.day)).allCheckedMembers;

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

          if (element.displayName && this.perPurokGroups.length === 1) {
            this.perPurokGroups[parseInt(element.groupNo) - 1] = [];
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
            status: element.status
          });
        });
      });
    }

    this.topItems = {
      binCount: binCount,
      kadCount: kadCount,
      bukCount: bukCount,
      msCount: msCount,
      uwpCount: uwpCount,
      allCount: totalCount
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

    let members = JSON.parse(localStorage.getItem('members')).members;

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


    members.forEach(element => {
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
  }

  showModal(group) {

    const modal = this.modalCtrl.create(GroupDashboardPage, { group: group, weekNo: this.weekNo, day: this.day, type: "attendance" });

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
