import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancesComponent } from './components/admin/finances/finances.component';
import { StatsAdminComponent } from './components/admin/stats-admin/stats-admin.component';
import { UploadersComponent } from './components/admin/uploaders/uploaders.component';
import { VideosComponent } from './components/admin/videos/videos.component';
import { SearchHistoryComponent } from './components/senior/search-history/search-history.component';
import { SearchComponent } from './components/senior/search/search.component';
import { SelectedVideoComponent } from './components/senior/selected-video/selected-video.component';
import { WatchHistoryComponent } from './components/senior/watch-history/watch-history.component';
import { LoginComponent } from './components/uploader/login/login.component';
import { MyProfileComponent } from './components/uploader/my-profile/my-profile.component';
import { MyUploadsComponent } from './components/uploader/my-uploads/my-uploads.component';
import { RegisterComponent } from './components/uploader/register/register.component';
import { StatisticsComponent } from './components/uploader/statistics/statistics.component';
import { UploadVideoComponent } from './components/uploader/upload-video/upload-video.component';
import { WithdrawsComponent } from './components/uploader/withdraws/withdraws.component';
import { VideosForApprovalComponent } from './components/admin/videos-for-approval/videos-for-approval.component';
import { ResetPasswordComponent } from './components/uploader/reset-password/reset-password.component';
import { BlockedVideosComponent } from './components/uploader/blocked-videos/blocked-videos.component';
import { BuyersSearchComponent } from './components/buyer/buyers-search/buyers-search.component';
import { RegisterBuyerComponent } from './components/buyer/register-buyer/register-buyer.component';
import { BuyersDataComponent } from './components/admin/buyers-data/buyers-data.component';
const routes: Routes = [
  {path:'search', component: SearchComponent},
  {path:'login',component:LoginComponent},
  {path:'upload',component:UploadVideoComponent},
  {path:'register',component:RegisterComponent},
  {path:'video',component:SelectedVideoComponent},
  {path:'myprofile',component:MyProfileComponent},
  {path:'searchhistory',component:SearchHistoryComponent},
  {path:'watchhistory',component:WatchHistoryComponent},
  {path:'myuploads',component:MyUploadsComponent},
  {path:'withdraws',component:WithdrawsComponent},
  {path:'stats',component:StatisticsComponent},
  {path:'finances',component:FinancesComponent},
  {path:'stats-admin',component:StatsAdminComponent},
  {path:'uploaders',component:UploadersComponent},
  {path:'videos',component:VideosComponent},
  {path:'videosforapproval',component:VideosForApprovalComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'blocked',component:BlockedVideosComponent},
  {path:'buyers',component:BuyersSearchComponent},
  {path:'registerbuyer',component:RegisterBuyerComponent},
  {path:'buyersdata',component:BuyersDataComponent},
  {path:'',component: SearchComponent}, 
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
