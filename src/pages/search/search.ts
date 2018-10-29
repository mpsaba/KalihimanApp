import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalCreatePage } from '../modal-create/modal-create';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchedMembers: any = [];
  members: any;
  myInput: any;
  shouldShowCancel: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.members = JSON.parse(localStorage.getItem('members'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(e) {

    this.searchedMembers = [];
    let input = this.myInput.toUpperCase()

    if (input) {
      this.members.forEach(element => {
        if (element.firstName.toUpperCase().indexOf(input) > -1 || element.lastName.toUpperCase().indexOf(input) > -1) {

          let color: any;
          if (element.kapisanan === 'Binhi') {
            color = "blue"
          }
          else if (element.kapisanan === 'Kadiwa') {
            color = "red"
          }
          else if (element.kapisanan === 'Buklod') {
            color = "green"
          }

          this.searchedMembers.push({
            id: element.id,
            color: color,
            firstName: element.firstName,
            lastName: element.lastName,
            displayName: element.firstName + " " + element.lastName,
            phoneNo: element.phoneNo,
            address: element.address,
            gender: element.gender,
            groupNo: element.groupNo,
            kapisanan: element.kapisanan,
            status: element.status,
            bday: element.bday,
            katiwala: element.katiwala,
            tungkulin: element.tungkulin
          });
        }
      });
    }
  }

  memberClicked(member) {
    const modal = this.modalCtrl.create(ModalCreatePage, {
      member: member
    });

    modal.present();
  }

}
