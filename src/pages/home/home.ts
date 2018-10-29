import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { MemberProvider } from '../../providers/member/member';
import { ModalCreatePage } from '../modal-create/modal-create';
import { GroupDashboardPage } from '../group-dashboard/group-dashboard';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayGroup: any = []; //by 2 per purok
  perPurokGroups: any = []; //per purok
  members: any = []; //data from database
  topItems: any = {};
  loading: any;

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public memberProvider: MemberProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public afDatabase: AngularFireDatabase) {

    console.log("HomePage");
  }

  ionViewWillEnter() {
    // for (let i: number = 0; i < 28; i++) {
    //   this.perPurokGroups[i] = [];
    // }

    if (localStorage.getItem('members')) {

      this.members = JSON.parse(localStorage.getItem("members"));
      this.showLoading("Loading dashboard...")
      this.displayDashboard("All");

    } else {

      this.memberProvider.getMembers().then(data => {
        this.members = data;
        localStorage.setItem('members', JSON.stringify(data));
        this.showLoading("Loading dashboard...")
        this.displayDashboard("All");
      }).catch(error => {
        console.log(error)
      });

    }
  }

  doRefresh(refresher) {

    if (refresher) {
      refresher.complete();
    }

    for (let i: number = 0; i < 28; i++) {
      this.perPurokGroups[i] = [];
    }

    this.memberProvider.getMembers().then(data => {
      this.members = data;
      localStorage.setItem('members', JSON.stringify(data));
      this.showLoading("Loading dashboard...")
      this.displayDashboard("All");
    }).catch(error => {
      this.members = JSON.parse(localStorage.getItem("members"));
      this.showLoading("Loading dashboard...")
      this.displayDashboard("All");
    });

  }

  displayDashboard(type) {

    for (let i: number = 0; i < 28; i++) {
      this.perPurokGroups[i] = [];
    }

    let binCount = 0;
    let kadCount = 0;
    let bukCount = 0;
    let msCount = 0;
    let uwpCount = 0;
    let kaso = 0;

    this.members.forEach(element => {

      if (element.status != "4" && element.status != "5" && element.status != "6" && element.status != "7") {
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
        else if (element.status == 3) {
          kaso++;
        }

        if (type === "All") {
          this.perPurokGroups[parseInt(element.groupNo) - 1].push({
            id: element.id,
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
            bday: element.bday,
            katiwala: element.katiwala,
            tungkulin: element.tungkulin
          });
        } else {
          if (element.kapisanan === type) {
            this.perPurokGroups[parseInt(element.groupNo) - 1].push({
              id: element.id,
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
              bday: element.bday,
              katiwala: element.katiwala,
              tungkulin: element.tungkulin
            });
          }
        }
      }

    });

    this.topItems = {
      binCount: binCount,
      kadCount: kadCount,
      bukCount: bukCount,
      msCount: msCount,
      uwpCount: uwpCount,
      kaso: kaso,
      allCount: binCount + kadCount + bukCount
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
    }, 1000);

  }

  addMemberClicked() {
    const modal = this.modalCtrl.create(ModalCreatePage);
    modal.present();
  }

  groupClicked(group) {
    const modal = this.modalCtrl.create(GroupDashboardPage, { group: group, type: "home" });
    modal.present();
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
