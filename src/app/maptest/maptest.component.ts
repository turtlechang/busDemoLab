import { Component, OnInit } from '@angular/core';
import { BusService, BusStop, BusData } from '../served/bus.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.css']
})
export class MaptestComponent implements OnInit {

  lat: number = 25.008077;//25.020777 緯度
  lng: number = 121.301521;//121.281521 經度
  zoomValue: number = 13;// 預設縮放大小，zoom 的數值可從 0 到 21，也可以透過其他設定屬性，指定最小與最大值。
  iconUrlStopBack: string = './assets/StopBack.png';//icon的路徑 綠色
  iconUrlStopGo: string = './assets/StopGo.png';//icon的路徑 紅色
  iconUrlBusIconGo: string = './assets/BusIconGo.png';//icon的路徑
  iconUrlBusIconBack: string = './assets/BusIconBack.png';//icon的路徑
  isOpen: boolean = false;

  len: number = 0;//站牌數量的長度
  busStopsGo: BusStop[] = [];// 去程站牌
  busStopsBack: BusStop[] = [];// 回程站牌  
  busDatasGo: BusData[] = [];// 去程公車
  busDatasBack: BusData[] = [];// 回程公車

  busStopId: string = this.routeInfo.snapshot.params['busStopId'];

  constructor(
    private routeInfo: ActivatedRoute,
    private busService: BusService
  ) { }

  ngOnInit() {
    this.busService.getBusData(this.busStopId).subscribe(
      (busData) => {
        this.busDatasGo = busData.filter((o) => o.GoBack == '1' && o.BusStatus == '0' && o.DutyStatus == '0');
        this.busDatasBack = busData.filter((o) => o.GoBack == '2' && o.BusStatus == '0' && o.DutyStatus == '0');
      }
    );//初始化公車icon

    this.busService.getBusList(this.busStopId).subscribe(
      (busStop) => {
        this.len = busStop.length;
        this.busStopsGo = busStop.filter((o) => o.GoBack == '1');// 去程站牌
        this.busStopsBack = busStop.filter((o) => o.GoBack == '2');// 回程站牌         
      }
    );//初始化公車站牌icon

    setInterval(
      () => {
        this.busService.getBusData(this.busStopId).subscribe(
          (busData) => {
            this.busDatasGo = busData.filter((o) => o.GoBack == '1' && o.BusStatus == '0' && o.DutyStatus == '0');
            this.busDatasBack = busData.filter((o) => o.GoBack == '2' && o.BusStatus == '0' && o.DutyStatus == '0');
          }
        );
      }, 15000);// 每15秒刷新地圖，讓公車能顯示目前的位置   
  }

  initData() {
    this.lat = 35.6681625;//緯度
    this.lng = 139.6007805;//經度
    console.log('我在東京了!!');
  }

  // getCenterLat(busStop: BusStop[]) {
  //   let latMax = busStop.reduce(function (previousValue, currentValue) {
  //     return previousValue.latitude > currentValue.latitude ? previousValue : currentValue;
  //   });
  //   console.log('最大經度: ' + latMax.latitude);
  //   let latMin = busStop.reduce(function (previousValue, currentValue) {
  //     return previousValue.latitude < currentValue.latitude ? previousValue : currentValue;
  //   });
  //   console.log('最小經度: ' + latMin.latitude);
  //   return ((latMax.latitude + latMin.latitude) / 2);    
  // }

  // getCenterLng(busStop: BusStop[]) {
  //   let lngMax = busStop.reduce(function (previousValue, currentValue) {
  //     return previousValue.longitude > currentValue.longitude ? previousValue : currentValue;
  //   });
  //   console.log('最大緯度: ' + lngMax.longitude);
  //   let lngMin = busStop.reduce(function (previousValue, currentValue) {
  //     return previousValue.longitude < currentValue.longitude ? previousValue : currentValue;
  //   });
  //   console.log('最小緯度: ' + lngMin.longitude);
  //   return ((lngMax.longitude + lngMin.longitude) / 2);    
  // }


}