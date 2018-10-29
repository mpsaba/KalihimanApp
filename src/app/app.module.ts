import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MemberProvider } from '../providers/member/member';
import { ModalCreatePage } from '../pages/modal-create/modal-create';
import { GroupDashboardPage } from '../pages/group-dashboard/group-dashboard';
import { AttendancePage } from '../pages/attendance/attendance';
import { SearchPage } from '../pages/search/search';
import { ModalMarkingPage } from '../pages/modal-marking/modal-marking';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SambahayanPage } from '../pages/sambahayan/sambahayan';
import { TungkulinPage } from '../pages/tungkulin/tungkulin';
import { RecordsPage } from '../pages/records/records';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDRRu5qAld5jDPCBpSll7s-SOi_M6aKuSw",
  authDomain: "pasaykalihimapp.firebaseapp.com",
  databaseURL: "https://pasaykalihimapp.firebaseio.com",
  projectId: "pasaykalihimapp",
  storageBucket: "pasaykalihimapp.appspot.com",
  messagingSenderId: "1089213453324"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ModalCreatePage,
    GroupDashboardPage,
    AttendancePage,
    SearchPage,
    ModalMarkingPage,
    SambahayanPage,
    TungkulinPage,
    RecordsPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ModalCreatePage,
    GroupDashboardPage,
    AttendancePage,
    SearchPage,
    ModalMarkingPage,
    SambahayanPage,
    TungkulinPage,
    RecordsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MemberProvider,
    AuthProvider
  ]
})
export class AppModule { }
