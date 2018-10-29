import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-marking',
  templateUrl: 'modal-marking.html',
})
export class ModalMarkingPage {

  member: any;
  codes: any = [];
  code: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController) {

    this.member = this.navParams.get('member');
    this.codes = [
      {
        code: '1',
        desc: 'Sumamba sa ibang Lokal'
      }, {
        code: '2',
        desc: 'R1-07'
      }, {
        code: 'X',
        desc: 'Walang code'
      }, {
        code: 'B',
        desc: 'Trabaho'
      }, {
        code: 'D',
        desc: 'Nagkasakit'
      }, {
        code: 'E',
        desc: 'Hinahadlangan / Inuusig'
      }, {
        code: 'F',
        desc: 'May Inasikaso sa Bahay'
      }, {
        code: 'G',
        desc: 'Hindi matagpuan / UWP'
      }, {
        code: 'H',
        desc: 'Hindi Umabot sa Pagsamba'
      }, {
        code: 'I',
        desc: 'Nasa ibang Lokal'
      }, {
        code: 'K',
        desc: 'Kalamidad'
      }, {
        code: 'L',
        desc: 'Pag-aaral'
      }, {
        code: 'N',
        desc: 'Nagwawalang bahala'
      },
    ]

    for (let i = 0; i < this.codes.length; i++) {
      if (this.member.code === this.codes[i].code) {
        this.codes[i].isChecked = true;
      }
    }
  }


  checked(code) {
    if (code.isChecked) {
      for (let i = 0; i < this.codes.length; i++) {
        if (code.code != this.codes[i].code) {
          this.codes[i].isChecked = false;
        }
      }
      this.code = code;
    }
  }

  save() {

    let isValid = false;

    for (let i = 0; i < this.codes.length; i++) {
      if (this.codes[i].isChecked) {
        isValid = true;
      }
    }

    if (isValid) {
      this.member.code = this.code.code;
      this.viewCtrl.dismiss(this.member);
    } else {
      let toast = this.toastCtrl.create({
        message: "Please select a code",
        duration: 2000,
        position: 'bottom'
      });

      toast.present();
    }
  }

}
