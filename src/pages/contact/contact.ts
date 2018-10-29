import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { MemberProvider } from '../../providers/member/member';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  weekNo: any;
  day: any;
  loading: any;
  items: any = [];
  perGroups: any = {};
  displayGroups: any = [];

  tAve: any;
  sAve: any;
  tKab: number = 0;
  sKab: number = 0;
  oTKab: number = 0;
  oSKab: number = 0;
  tSNum: number = 0;
  sSNum: number = 0;
  totalAve: any;

  noRecords: boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public memberProvider: MemberProvider) {

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
        }
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: data => {
            if (data.weekNo) {
              this.weekNo = data.weekNo;
              this.displayDashboard();
            } else {
              let toast = this.toastCtrl.create({
                message: "Please enter week number.",
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

    for (let i: number = 0; i < 28; i++) {
      this.perGroups[i] = {};
    }
  }

  doRefresh(refresher) {

    refresher.complete();


    this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

  getCode() {
    let code: any = {};

    code['1'] = {};
    code['2'] = {};
    code['A'] = {};
    code['B'] = {};
    code['C'] = {};
    code['D'] = {};
    code['E'] = {};
    code['F'] = {};
    code['G'] = {};
    code['H'] = {};
    code['I'] = {};
    code['J'] = {};
    code['K'] = {};
    code['L'] = {};
    code['M'] = {};
    code['N'] = {};
    code['X'] = {};

    return code;
  }


  displayDashboard() {
    this.memberProvider.getSNumber().then(data => {

      let sNumberData: any = data;
      let newArr = [];

      sNumberData.forEach(element => {
        let item = element.split(",");
        newArr.push({
          groupNo: item[0],
          tDati: item[1],
          tIn: item[2],
          tOut: item[3],
          tKas: item[4],
          sIn: item[5],
          sOut: item[6],
          sKas: item[7]
        });
      });

      this.items = newArr;

      if (localStorage.getItem("coding" + this.weekNo + "T") && localStorage.getItem("coding" + this.weekNo + "S")) {
        this.calculateThursday().then(data => {
          this.calculateSunday().then(data => {
            this.calculateTotal();
          });
        });
      } else {
        this.noRecords = true;
        let toast = this.toastCtrl.create({
          message: "Incomplete records.",
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
      }


    });
  }

  calculateThursday() {

    return new Promise((resolve) => {

      let tMembers = JSON.parse(localStorage.getItem("coding" + this.weekNo + "T")).allCheckedMembers;
      let with2Decimals = '0';

      Object.keys(tMembers).forEach(key => {

        this.items.forEach(element => {

          if (element.groupNo === tMembers[key][0].groupNo) {

            let code = this.getCode();

            tMembers[key].forEach(member => {
              if (code[member.code].count) {
                code[member.code] = {
                  count: code[member.code].count + 1
                }
              } else {
                code[member.code] = {
                  count: 1
                }
              }
            });

            let otherLokal = 0;
            let didNot = 0;

            Object.keys(code).forEach(keyCode => {
              if (code[keyCode].hasOwnProperty('count') && keyCode != 'X') {

                if (keyCode === '1' || keyCode === '2') {
                  otherLokal += code[keyCode].count;
                } else {
                  didNot += code[keyCode].count;
                }
              }
            });

            let ave = (didNot / element.tKas) * 100
            with2Decimals = ave ? ave.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : '0';

            this.perGroups[parseInt(tMembers[key][0].groupNo) - 1] = {
              tKab: didNot,
              sKab: 0,
              oTKab: otherLokal,
              oSKab: 0,
              tSNum: element.tKas,
              sSNum: 0,
              tAve: with2Decimals,
              sAve: 0,
              totalAve: 0
            }

          }
        });

      });

      resolve("sucess");
    });

  }
  ;
  calculateSunday() {

    return new Promise((resolve) => {

      let sMembers = JSON.parse(localStorage.getItem("coding" + this.weekNo + "S")).allCheckedMembers;
      let with2Decimals = '0';

      Object.keys(sMembers).forEach(key => {

        let sumSNum = 0;

        this.items.forEach(element => {

          if (element.groupNo === sMembers[key][0].groupNo) {

            let code = this.getCode();

            sMembers[key].forEach(member => {
              if (code[member.code].count) {
                code[member.code] = {
                  count: code[member.code].count + 1
                }
              } else {
                code[member.code] = {
                  count: 1
                }
              }
            });

            let otherLokal = 0;
            let didNot = 0;

            Object.keys(code).forEach(keyCode => {
              if (code[keyCode].hasOwnProperty('count') && keyCode != 'X') {
                if (keyCode === '1' || keyCode === '2') {
                  otherLokal += code[keyCode].count;
                } else {
                  didNot += code[keyCode].count;
                }
              }
            });

            sumSNum += element.sKas;

            let ave = (didNot / element.sKas) * 100
            with2Decimals = ave ? ave.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : '0';

            this.perGroups[parseInt(sMembers[key][0].groupNo) - 1] = {
              tKab: this.perGroups[sMembers[key][0].groupNo - 1].tKab ? this.perGroups[sMembers[key][0].groupNo - 1].tKab : 0,
              sKab: didNot,
              oTKab: this.perGroups[sMembers[key][0].groupNo - 1].oTKab ? this.perGroups[sMembers[key][0].groupNo - 1].oTKab : 0,
              oSKab: otherLokal,
              tSNum: this.perGroups[sMembers[key][0].groupNo - 1].tSNum ? this.perGroups[sMembers[key][0].groupNo - 1].tSNum : 0,
              sSNum: element.sKas,
              tAve: this.perGroups[sMembers[key][0].groupNo - 1].tAve ? this.perGroups[sMembers[key][0].groupNo - 1].tAve : 0,
              sAve: with2Decimals,
              totalAve: 0
            }
          }
        });
      });

      resolve("sucess");
    });

  }


  calculateTotal() {
    try {

      this.displayGroups = [];
      let totalTKab = 0;
      let totalSKab = 0;
      let totalOTKab = 0;
      let totalOSKab = 0;
      let totalTNum = 0;
      let totalSNum = 0;


      Object.keys(this.perGroups).forEach(key => {

        let tAve = this.perGroups[key].tAve ? parseFloat(this.perGroups[key].tAve) : 0
        let sAve = this.perGroups[key].sAve ? parseFloat(this.perGroups[key].sAve) : 0

        let ave = (tAve + sAve) / 2;
        let with2Decimals = ave.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        this.perGroups[key] = {
          tKab: this.perGroups[key].tKab ? this.perGroups[key].tKab : 0,
          sKab: this.perGroups[key].sKab ? this.perGroups[key].sKab : 0,
          oTKab: this.perGroups[key].oTKab ? this.perGroups[key].oTKab : 0,
          oSKab: this.perGroups[key].oSKab ? this.perGroups[key].oSKab : 0,
          tSNum: this.perGroups[key].tSNum ? this.perGroups[key].tSNum : 0,
          sSNum: this.perGroups[key].sSNum ? this.perGroups[key].sSNum : 0,
          tAve: this.perGroups[key].tAve ? this.perGroups[key].tAve : 0,
          sAve: this.perGroups[key].sAve ? this.perGroups[key].sAve : 0,
          totalAve: with2Decimals
        }

        totalTKab += parseFloat(this.perGroups[key].tKab);
        totalSKab += parseFloat(this.perGroups[key].sKab);
        totalOTKab += parseFloat(this.perGroups[key].oTKab);
        totalOSKab += parseFloat(this.perGroups[key].oSKab);
        totalTNum += parseFloat(this.perGroups[key].tSNum);
        totalSNum += parseFloat(this.perGroups[key].sSNum);

        this.displayGroups.push({
          groupNo: parseInt(key) + 1,
          tKab: this.perGroups[key].tKab,
          sKab: this.perGroups[key].sKab,
          oTKab: this.perGroups[key].oTKab,
          oSKab: this.perGroups[key].oSKab,
          tSNum: this.perGroups[key].tSNum,
          sSNum: this.perGroups[key].sSNum,
          tAve: this.perGroups[key].tAve,
          sAve: this.perGroups[key].sAve,
          totalAve: this.perGroups[key].totalAve
        })

        this.noRecords = false;

      });


      this.tKab = totalTKab;
      this.sKab = totalSKab;
      this.oTKab = totalOTKab;
      this.oSKab = totalOTKab;
      this.tSNum = totalTNum;
      this.sSNum = totalSNum;


      let a = (this.tKab / this.tSNum) * 100;
      let b = (this.sKab / this.sSNum) * 100;
      let c = (a + b) / 2;

      this.tAve = a.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      this.sAve = b.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      this.totalAve = c.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];;

    } catch (error) {
      console.log(error)
    }

  }


}
