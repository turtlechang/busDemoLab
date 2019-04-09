import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'//@Injectable()是angular的service使用做依賴注入的裝飾詞，可以使Service成為可被注入的元件。
})
export class BusService {

  private baseUrl: string = 'https://192.168.195.55';// 開發用

  searchEvent: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  // 取得全部的公車路線{EX: 中壢<->桃園、桃園<->果菜市場、桃園<->華映公司、桃園<->大有路...等等}
  getBusLists() {
    return this.httpClient.get<BusRouteList[]>(`${this.baseUrl}/bus/api/GetRoute`, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }
  // 取得該路線(單一)的所有公車站牌的
  //{EX:151同安街路線: 統領百貨站、桃園郵局、永和市場、中正三民路口、中正商業大樓、北埔路、中正信光街口、中正慈文路口、慈文國中、中正大興西路口、福安宮...等等}
  getBusList(routeId: string): Observable<BusStop[]> {
    // let body = routeId ? `?routeIds=${routeId}` : ''
    return this.httpClient.get<BusStop[]>(`${this.baseUrl}/bus/api/GetStop?routeIds=${routeId}`, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

  // 取得該路線(單一)的所有公車站牌的等待剩餘時間
  getEstimateTime(routeId: string): Observable<BusEstimateTimes> {
    return this.httpClient.get<BusEstimateTimes>(`${this.baseUrl}/bus/api/GetEstimateTime?routeIds=${routeId}`);
  }

  getBusData(routeId: string): Observable<BusData[]> {
    return this.httpClient.get<BusData[]>(`${this.baseUrl}/bus/api/GetBusData?routeIds=${routeId}`);
  }

  search(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bus/api/GetRoute`, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  }

}

//公車路線列表
export interface BusRouteList {
  ID: string,//路線代碼
  ProviderId: string,//
  nameZh: string,
  gxcode: string,
  ddesc: string,
  departureZh: string,
  destinationZh: string,
  RouteType: string,
  MasterRouteName: string,
  MasterRouteNo: string,
  MasterRouteDesc: string,
  routeMapImageUrl: string,
  stopAddrUrl: string,
  op_type: number
}

//公車站牌
export interface BusStop {
  Id: string,//站位代碼
  routeId: string,//路線代碼
  nameZh: string,//站位名稱
  seqNo: string,//站序
  pgp: string,//保留用
  terminal: string,//保留用
  districtId: string,//保留用
  GoBack: string,//去返程[1=去程,2=返程]
  latitude: number,//所在位置緯度
  longitude: number,//所在位置經度
  EXTVoiceNO: string,//舊系統用站牌擴充代碼，不再使用
  SID: string,//站牌內碼
  ivrno: number//語音播報代碼
}

export interface BusEstimateTimes {
  routeIds: BusEstimateTime[],//某單一公車路線名稱，型態是BusEstimateTime陣列
}

//公車站牌的等待剩餘時間
export interface BusEstimateTime {
  StopID: string,//站位代碼
  SID: string,//站牌內碼
  StopName: string,//站名
  GoBack: string,//去返程[1=去程,2=返程]
  seqNo: string,//站序
  IVRNO: string,//語音查詢代碼
  EXTVoiceNo: string,
  comeTime: string,//下一班班表時間
  comeCarid: string,//下一班預排車輛
  schIdD: string,//班表id
  carId: string,//車牌號碼
  Value: string,//預估時間[4~99=預估xx分到站，建議超過99分改顯示班表,0~3=建議三分鐘以下顯示即將進站,-3=末班駛離,null=未發車，若班表時間有值則顯示班表時間]
  ests: Ests[],//預估到站車輛清單，型態是Ests陣列，
}

//預估到站車輛清單
export interface Ests {
  carid: string;
  est: number;//預估xx分到站
  countdowntime: number;//倒數時間，用以推斷預估時間有效性
  islast: number;//是否為末班車[0=否,1=是]
}

//公車即時車輛位置的資料
export class BusData {
  constructor(
    public ProviderID: string,
    public BusID: string,
    public DutyStatus: string,
    public BusStatus: string,
    public RouteID: string,
    public GoBack: string,
    public Longitude: number,
    public Latitude: number,
    public Speed: string,
    public Azimuth: string,
    public DataTime: string,
    public ledstate: number,
    public sections: string,
    public carType: string,
    public rectime: string,
    public driverid: number
  ) { }
}
