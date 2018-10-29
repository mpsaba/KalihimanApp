import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreatePage } from './modal-create';

@NgModule({
  declarations: [
    ModalCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreatePage),
  ],
})
export class ModalCreatePageModule {}
