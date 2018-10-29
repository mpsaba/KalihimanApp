import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { ModalCreatePage } from '../modal-create/modal-create';
import { MemberProvider } from '../../providers/member/member';
import { HomePage } from '../home/home';
import { AttendancePage } from '../attendance/attendance';
import { ModalMarkingPage } from '../modal-marking/modal-marking';

@IonicPage()
@Component({
  selector: 'page-group-dashboard',
  templateUrl: 'group-dashboard.html',
})
export class GroupDashboardPage {

  group: any = [];
  checkedMembers: any = [];
  weekNo: any;
  day: any;
  type: any;
  topItems: any = [];
  otherTopItems: any = [];
  codes: any = {};


  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public memberProvider: MemberProvider,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {

    this.weekNo = this.navParams.get('weekNo');
    this.day = this.navParams.get('day');
    this.type = this.navParams.get('type');
  }

  ionViewDidLoad() {

    if (this.type === 'attendance') {

      if (localStorage.getItem('attendance' + "" + this.weekNo + "" + this.day)) {

        let group = this.navParams.get('group');
        let allCheckedMembers = JSON.parse(localStorage.getItem('attendance' + "" + this.weekNo + "" + this.day)).allCheckedMembers;

        if (allCheckedMembers[group[0].groupNo]) {
          for (let i = 0; i < group.length; i++) {

            allCheckedMembers[group[0].groupNo].forEach(element => {
              if (group[i].firstName === element.firstName && group[i].lastName === element.lastName) {
                group[i] = element;
              }
            });
          }

          this.checkedMembers = allCheckedMembers[group[0].groupNo];
        }

        this.group = group;
      } else {
        this.group = this.navParams.get('group');
      }

    } else if (this.type === 'coding') {

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

      if (localStorage.getItem('coding' + "" + this.weekNo + "" + this.day)) {

        let group = this.navParams.get('group');
        let allCheckedMembers = JSON.parse(localStorage.getItem('coding' + "" + this.weekNo + "" + this.day)).allCheckedMembers;

        if (allCheckedMembers[group[0].groupNo]) {

          this.topItems = [];
          this.otherTopItems = [];
          for (let i = 0; i < group.length; i++) {
            allCheckedMembers[group[0].groupNo].forEach(element => {
              if (group[i].firstName === element.firstName && group[i].lastName === element.lastName) {

                if (this.codes[element.code].count) {
                  this.codes[element.code] = {
                    count: this.codes[element.code].count + 1
                  }
                } else {
                  this.codes[element.code] = {
                    count: 1
                  }
                }
                group[i] = element;
              }
            });
          }


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

        }

        this.group = group;

      } else {
        this.group = this.navParams.get('group');
      }
    } else {
      this.group = this.navParams.get('group');
    }
  }

  //attendance
  checked(member) {
    if (member.checked === true) {
      this.checkedMembers.push(member);
    } else {
      let indexNo = this.checkedMembers.indexOf(member);
      this.checkedMembers.splice(indexNo, 1)
    }
  }


  //attendance
  saveAttendance() {
    if (localStorage.getItem('attendance' + "" + this.weekNo + "" + this.day)) {

      let allCheckedMembers = JSON.parse(localStorage.getItem(this.type + "" + this.weekNo + "" + this.day)).allCheckedMembers;
      allCheckedMembers[this.checkedMembers[0].groupNo] = this.checkedMembers;
      localStorage.setItem('attendance' + "" + this.weekNo + "" + this.day, JSON.stringify({ allCheckedMembers: allCheckedMembers }));

    } else {
      let groupObject = {};
      // let allCheckedMembers = [];

      groupObject[this.checkedMembers[0].groupNo] = this.checkedMembers;
      // allCheckedMembers.push(groupObject);
      localStorage.setItem('attendance' + "" + this.weekNo + "" + this.day, JSON.stringify({ allCheckedMembers: groupObject }));
    }

    this.viewCtrl.dismiss(this.weekNo);

  }

  //both
  close() {
    this.viewCtrl.dismiss(this.weekNo);
  }

  //coding
  showCodes(member) {
    const modal = this.modalCtrl.create(ModalMarkingPage, { member: member });
    modal.present();

    modal.onDidDismiss(data => {


      if (data) {
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

        for (let i = 0; i < this.group.length; i++) {
          if (this.group[i].firstName === data.firstName && this.group[i].lastName === data.lastName) {
            this.group[i].code = data.code;

          }
          if (this.group[i].code) {
            if (this.codes[this.group[i].code].count) {
              this.codes[this.group[i].code] = {
                count: this.codes[this.group[i].code].count + 1
              }
            } else {
              this.codes[this.group[i].code] = {
                count: 1
              }
            }
          }
        }

        this.topItems = [];
        this.otherTopItems = [];

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

        if (localStorage.getItem('coding' + "" + this.weekNo + "" + this.day)) {

          let allCheckedMembers = JSON.parse(localStorage.getItem('coding' + "" + this.weekNo + "" + this.day)).allCheckedMembers;
          allCheckedMembers[this.group[0].groupNo] = this.group;
          localStorage.setItem('coding' + "" + this.weekNo + "" + this.day, JSON.stringify({ allCheckedMembers: allCheckedMembers }));

        } else {
          let groupObject = {};
          // let allCheckedMembers = [];
          groupObject[this.group[0].groupNo] = this.group;
          // allCheckedMembers.push(groupObject);
          localStorage.setItem('coding' + "" + this.weekNo + "" + this.day, JSON.stringify({ allCheckedMembers: groupObject }));
        }
      }

    });
  }

  memberClicked(member) {
    const modal = this.modalCtrl.create(ModalCreatePage, {
      member: member
    });

    modal.present();
  }

}