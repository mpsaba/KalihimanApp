import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { SambahayanPage } from '../sambahayan/sambahayan';
import { TungkulinPage } from '../tungkulin/tungkulin';
import { RecordsPage } from '../records/records';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TungkulinPage;
  tab3Root = SambahayanPage;
  tab4Root = RecordsPage;
  tab5Root = SearchPage;

  constructor() {
  }


}
