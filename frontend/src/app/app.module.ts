import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import { SearchComponent } from './components/senior/search/search.component';
import { SearchHistoryComponent } from './components/senior/search-history/search-history.component';
import { WatchHistoryComponent } from './components/senior/watch-history/watch-history.component';
import { SelectedVideoComponent } from './components/senior/selected-video/selected-video.component';
import { LoginComponent } from './components/uploader/login/login.component';
import { RegisterComponent } from './components/uploader/register/register.component';
import { ResetPasswordComponent } from './components/uploader/reset-password/reset-password.component';
import { UploadVideoComponent } from './components/uploader/upload-video/upload-video.component';
import { MyUploadsComponent } from './components/uploader/my-uploads/my-uploads.component';
import { WithdrawsComponent } from './components/uploader/withdraws/withdraws.component';
import { StatisticsComponent } from './components/uploader/statistics/statistics.component';
import { MyProfileComponent } from './components/uploader/my-profile/my-profile.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTimepickerModule } from 'mat-timepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { A11yModule } from '@angular/cdk/a11y';
import { FinancesComponent } from './components/admin/finances/finances.component';
import { StatsAdminComponent } from './components/admin/stats-admin/stats-admin.component';
import { UploadersComponent } from './components/admin/uploaders/uploaders.component';
import { VideosComponent } from './components/admin/videos/videos.component';
import { VideosForApprovalComponent } from './components/admin/videos-for-approval/videos-for-approval.component';
import { NgxPrintModule } from 'ngx-print';
import { CreditCardDialogComponent } from './components/uploader/credit-card-dialog/credit-card-dialog.component';
import { PaypalDialogComponent } from './components/uploader/paypal-dialog/paypal-dialog.component';
import { BitcoinDialogComponent } from './components/uploader/bitcoin-dialog/bitcoin-dialog.component';
import { BlockedVideosComponent } from './components/uploader/blocked-videos/blocked-videos.component';
import { BlockedVideosDialogComponent } from './components/uploader/blocked-videos-dialog/blocked-videos-dialog.component';
import { BuyersSearchComponent } from './components/buyer/buyers-search/buyers-search.component';
import { VideoDialogComponent } from './components/buyer/video-dialog/video-dialog.component';
import { RegisterBuyerComponent } from './components/buyer/register-buyer/register-buyer.component';
import { BuyersDataComponent } from './components/admin/buyers-data/buyers-data.component';
const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatStepperModule,
  MatTimepickerModule,
  LayoutModule,
  FlexLayoutModule,
  A11yModule,
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchHistoryComponent,
    WatchHistoryComponent,
    SelectedVideoComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    UploadVideoComponent,
    MyUploadsComponent,
    WithdrawsComponent,
    StatisticsComponent,
    MyProfileComponent,
    StatsAdminComponent,
    UploadersComponent,
    VideosComponent,
    VideosForApprovalComponent,
    FinancesComponent,
    CreditCardDialogComponent,
    PaypalDialogComponent,
    BitcoinDialogComponent,
    BlockedVideosComponent,
    BlockedVideosDialogComponent,
    BuyersSearchComponent,
    VideoDialogComponent,
    RegisterBuyerComponent,
    BuyersDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    materialModules,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dxjydzq3r' } as CloudinaryConfiguration),

  ],
  exports:[materialModules],
  providers: [  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
