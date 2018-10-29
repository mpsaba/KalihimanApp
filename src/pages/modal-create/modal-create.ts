import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-modal-create',
  templateUrl: 'modal-create.html',
})
export class ModalCreatePage {

  member: any = {};
  type: any;
  buttonMaleColor: any;
  buttonFemaleColor: any;
  buttonBinhiColor: any;
  buttonKadiwaColor: any;
  buttonBuklodColor: any;
  selectOptions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public memberProvider: MemberProvider) {

    this.buttonMaleColor = "#ff66a3";
    this.buttonFemaleColor = "#ff66a3";

    this.buttonBinhiColor = "lightblue";
    this.buttonKadiwaColor = "#ffcccc";
    this.buttonBuklodColor = "lightgreen";

    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };
  }

  ionViewDidLoad() {
    if (this.navParams.get('member')) {
      this.type = "update";
      this.member = this.navParams.get('member');
      this.genderClicked(this.member.gender);
      this.kapisananClicked(this.member.kapisanan);
    } else {
      this.type = "add";
    }
  }

  genderClicked(gender) {
    this.member.gender = gender;
    if (gender === "M") {
      this.buttonMaleColor = "#b30047";
      this.buttonFemaleColor = "#ff66a3";
    } else {
      this.buttonMaleColor = "#ff66a3";
      this.buttonFemaleColor = "#b30047";
    }
  }

  kapisananClicked(kapisanan) {
    this.member.kapisanan = kapisanan;
    if (kapisanan === "Binhi") {
      this.buttonBinhiColor = "blue";
      this.buttonKadiwaColor = "#ffcccc";
      this.buttonBuklodColor = "#66ffb3";
    } else if (kapisanan === "Kadiwa") {
      this.buttonBinhiColor = "lightblue";
      this.buttonKadiwaColor = "red";
      this.buttonBuklodColor = "#66ffb3";
    } else {
      this.buttonBinhiColor = "lightblue";
      this.buttonKadiwaColor = "#ffcccc";
      this.buttonBuklodColor = "green";
    }
  }

  save() {
    if (this.type == "add") {
      this.memberProvider.addMember(this.member).then(data => {
        this.close();
      });
    } else {
      this.memberProvider.update({
        id: this.member.id,
        firstName: this.member.firstName,
        lastName: this.member.lastName,
        phoneNo: this.member.phoneNo ? this.member.phoneNo : "",
        address: this.member.address ? this.member.address : "",
        gender: this.member.gender,
        kapisanan: this.member.kapisanan,
        groupNo: this.member.groupNo,
        status: this.member.status ? this.member.status : "",
        bday: this.member.bday ? this.member.bday : "",
        katiwala: this.member.katiwala ? this.member.katiwala : "",
        tungkulin: this.member.tungkulin ? this.member.tungkulin : "",
        remarks: this.member.remarks ? this.member.remarks : ""
      }).then(data => {
        this.close();
      });
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
