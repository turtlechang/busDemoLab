import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'//@Injectable()是angular的service使用做依賴注入的裝飾詞，可以使Service成為可被注入的元件。
})
export class BusService {

  //private baseUrl: string = 'https://192.168.195.55';// 開發用

  searchEvent: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  // 取得全部的公車路線{EX: 中壢<->桃園、桃園<->果菜市場、桃園<->華映公司、桃園<->大有路...等等}
  getBusLists() {
    return this.httpClient.get<BusRouteList[]>(`http://192.168.199.3/BusWebApi/api/route`);
  }
  // 取得該路線(單一)的所有公車站牌的
  //{EX:151同安街路線: 統領百貨站、桃園郵局、永和市場、中正三民路口、中正商業大樓、北埔路、中正信光街口、中正慈文路口、慈文國中、中正大興西路口、福安宮...等等}
  getBusList(routeId: string): Observable<BusStop[]> {
    return this.httpClient.get<BusStop[]>(`http://192.168.199.3/BusWebApi/api/stop/${routeId}`);
  }

  // 取得該路線(單一)的所有公車站牌的等待剩餘時間
  getEstimateTime(routeId: string): Observable<BusEstimateTimes> {
    return this.httpClient.get<BusEstimateTimes>(`http://192.168.199.3/BusWebApi/api/estimatetime/${routeId}`);
  }

  getBusData(routeId: string): Observable<BusData[]> {
    return this.httpClient.get<BusData[]>(`http://192.168.199.3/BusWebApi/api/busdata/${routeId}`);
  }
}

//公車路線列表
export interface BusRouteList {
  /**
   * 路線代碼
   */
  ID: string,
  /**
   * 業者代號
   */
  ProviderId: string,
  /**
   * 路線的中文名稱
   */
  nameZh: string,
  /**
   * 公總對應路線代碼
   */
  gxcode: string,
  /**
   * 路線的詳細描述
   */
  ddesc: string,
  /**
   * 路線起點
   */
  departureZh: string,
  /**
   * 路線起點
   */
  destinationZh: string,
  /**
   * 路線類別
   */
  RouteType: string,
  /**
   * 保留
   */
  MasterRouteName: string,
  /**
   * 保留
   */
  MasterRouteNo: string,
  /**
   * 保留
   */
  MasterRouteDesc: string,
  /**
   * 路線地圖網址
   */
  routeMapImageUrl: string,
  /**
   * 路線地圖網址
   */
  stopAddrUrl: string,
  op_type: number
}

//公車站牌
export interface BusStop {
  /**
   * 站位代碼
   */
  Id: string,
  /**
   * 路線代碼
   */
  routeId: string,
  /**
   * 站位名稱
   */
  nameZh: string,
  /**
   * 站序
   */
  seqNo: string,
  /**
   * 保留用
   */
  pgp: string,
  /**
   * 保留用
   */
  terminal: string,
  /**
   * 保留用
   */
  districtId: string,
  /**
   * 去返程(1=去程,2=返程)
   */
  GoBack: string,
  /**
   * 所在位置緯度
   */
  latitude: number,
  /**
   * 所在位置經度
   */
  longitude: number,
  /**
   * 舊系統用站牌擴充代碼，不再使用
   */
  EXTVoiceNO: string,
  /**
   * 站牌內碼
   */
  SID: string,
  /**
   * 語音播報代碼
   */
  ivrno: number
}

export interface BusEstimateTimes {
  /**
   * 某單一公車路線名稱，型態是BusEstimateTime陣列
   */
  routeIds: BusEstimateTime[]
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
