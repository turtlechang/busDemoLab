import { Component, OnInit } from '@angular/core';
import { BusService } from '../served/bus.service';

@Component({
  selector: 'app-search',// the components CSS element selector以及在HTML裡要宣告的TAG名稱
  templateUrl: './search.component.html',//要使用的HTML樣版位置
  styleUrls: ['./search.component.css']//專為這個元件設定的CSS
})

//要注意的是，我們通常會使用export class，以方便在其他的模組裡可以import來使用
export class SearchComponent implements OnInit {

  searchlist: string='';
  constructor(private busService: BusService) {

  }

  ngOnInit() {

  }

  onSearch() {
    this.busService.searchEvent.emit(this.searchlist);
    console.log('輸入的是: ' + this.searchlist)
  }

}