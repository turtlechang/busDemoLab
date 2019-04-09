import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService, BusRouteList, BusEstimateTime } from '../served/bus.service';

@Component({
  selector: 'app-bus-way',
  templateUrl: './bus-way.component.html',
  styleUrls: ['./bus-way.component.css']
})
//這裡是公車行車路徑
export class BusWayComponent implements OnInit {

  busLists: BusRouteList[] = [];//宣告公車路線列表的物件。 
  showTime: BusEstimateTime[] = [];//宣告公車的等待剩餘時間。

  busRouteName: string = '';//單一公車路線的名稱
  destination: string = '';//目的地的站牌
  departure: string = '';//出發地的站牌

  busStopId: string = this.routeInfo.snapshot.params['busStopId'];

  getGointerval: any;
  getBackinterval: any;

  constructor(
    private routeInfo: ActivatedRoute,
    private busService: BusService) {
  }

  ngOnInit() {
    //取得單一公車路線的名稱及出發地和目的地
    this.busService.getBusLists().subscribe(
      (busList) => {
        this.busLists = busList;
        this.busRouteName = this.busLists.find(o => o.ID == this.busStopId).nameZh;
        this.departure = this.busLists.find(o => o.ID == this.busStopId).departureZh;
        this.destination = this.busLists.find(o => o.ID == this.busStopId).destinationZh;
      }
    );
    //初始化去程列表
    this.getGo();
    setInterval(function () {
      console.log("log");
    }, 2000);
    
  }

  getGo() {
    // 取得單一公車路線的去程列表      
    this.busService.getEstimateTime(this.busStopId).subscribe(
      (time) => {
        this.showTime = time[this.busStopId].filter((o) => o.GoBack == '1');
        //console.log(time[this.busStopId]['0']['StopName']);
        //console.log(time[this.busStopId][0].StopName);
      }
    )
    console.log('我是回程:getGo!!');
  }

  getBack() {
    // 取得單一公車路線的回程列表      
    this.busService.getEstimateTime(this.busStopId).subscribe(
      (time) => {
        this.showTime = time[this.busStopId].filter((o) => o.GoBack == '2');
        //console.log(time[this.busStopId]['0']['StopName']);
        //console.log(time[this.busStopId][0].StopName);
      }
    );
    console.log('我是去程:getBack!!');
  }

  // checkWay() {
  //   if (this.check == "go") {
  //     this.getGo();
  //   }
  //   else if (this.check == 'back') {
  //     this.getBack();
  //   }
  // }
}
