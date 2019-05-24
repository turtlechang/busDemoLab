/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { BusService, BusStop, BusData } from '../served/bus.service';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

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
  a1: any;//統領百貨站
  a2: any;//尊爵飯店
  a3: any;//中正公園(同安街)
  a4: any;//統領百貨
  travelMode: string = 'TRANSIT';
  transitOptions: any = {
    departureTime: new Date('2019/05/11 15:14'),
    arrivalTime: new Date('2019/05/11 15:30'),
    modes: ['BUS']
  }
  constructor(
    private routeInfo: ActivatedRoute,
    private busService: BusService
  ) { }

  ngOnInit() {
    this.a1 = { lat: 24.9913578852, lng: 121.312086582 };//統領百貨站
    this.a2 = { lat: 25.02423167, lng: 121.297355 };//尊爵飯店
    this.a3 = { lat: 25.022552, lng: 121.298711 };//中正公園(同安街)
    this.a4 = { lat: 24.99129, lng: 121.31108 };//統領百貨
    
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
}