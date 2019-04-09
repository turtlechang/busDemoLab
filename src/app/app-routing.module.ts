import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusWayComponent } from './bus-way/bus-way.component';
import { RoutedsearchComponent } from './routedsearch/routedsearch.component';
import { MaptestComponent } from './maptest/maptest.component';
import { StopSearchComponent } from './stop-search/stop-search.component';

//路由配置
const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'BusRouteSearch', component: RoutedsearchComponent },
  { path: 'BusRouteSearch/:busStopId', component: BusWayComponent },
  { path: 'StopSearch', component: StopSearchComponent },
  { path: 'MapTest', component: MaptestComponent },
  { path: '**', redirectTo: '/Home'},// 若為 ** ，萬用路由，所有匹配不符合的項目都會轉向此設定，須放在最後面。
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
