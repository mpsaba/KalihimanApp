import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodingPage } from './coding';

@NgModule({
  declarations: [
    CodingPage,
  ],
  imports: [
    IonicPageModule.forChild(CodingPage),
  ],
})
export class CodingPageModule {}
