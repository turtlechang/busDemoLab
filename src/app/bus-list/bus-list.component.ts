import { Component, OnInit } from '@angular/core';
import { BusRouteList, BusService } from '../served/bus.service';


@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
// 這裡是公車站位資訊(清單)
export class BusListComponent implements OnInit {

  buslists: BusRouteList[];

  constructor(private busService: BusService) { }

  ngOnInit() {
    // 首次登入的時候對公車的展示，同步的寫法    
    this.busService.getBusLists().subscribe((res) => { this.buslists = res });

    console.log(this.busService.getBusLists());
    //通過搜索按鈕實現的發射的流的接收和訂閲
    this.busService.searchEvent.subscribe(
      (params) => {
        this.busService.search().subscribe(
          (res) => {
            this.buslists = res.filter(
              (bus) => {
                if (params) {
                  return bus.nameZh == params;
                } else {
                  this.busService.getBusLists().subscribe((res) => { this.buslists = res });
                }
              }
            )
          }
        );
      }
    );


    
  }
}
//在RxJS中，有兩個角色，Observable和Subscription，
//Observable負責產生資料，創建後不會馬上啟動，而在_關注(subscribe)後開始啟動_。