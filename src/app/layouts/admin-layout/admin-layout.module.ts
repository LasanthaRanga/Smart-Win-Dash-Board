import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';


import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatPaginatorModule } from '@angular/material/paginator';


import { MatPaginatorModule } from '@angular/material';
import { RegisterComponent } from '../../pages/register/register.component';
import { InvoiceComponent } from '../../pages/invoice/invoice.component';
import { TreeComponent } from '../../pages/tree/tree.component';
import { ProductsComponent } from '../../pages/products/products.component'
import { CompleteComponent } from '../../pages/complete/complete.component'
import { ActiveComponent } from '../../pages/active/active.component';
import { UsersComponent } from '../../pages/users/users.component';
import { NewnodComponent } from '../../pages/newnod/newnod.component';
import { NewtreeComponent } from '../../pages/newtree/newtree.component';
import { ProcessComponent } from '../../pages/process/process.component';
import { PointComComponent } from '../../pages/point-com/point-com.component';
import { MyincomeComponent } from '../../pages/myincome/myincome.component';
import { MyteamComponent } from '../../pages/myteam/myteam.component';
import { IncomeComponent } from '../../pages/income/income.component';
import { ExpenseComponent } from '../../pages/expense/expense.component';
import { HomeComponent } from '../../pages/home/home.component';
import { PinsComponent } from '../../pages/pins/pins.component';
import { OdersComponent } from '../../pages/oders/oders.component';
import { NotifyComponent } from '../../pages/notify/notify.component';
import { AddnewComponent } from '../../pages/addnew/addnew.component';
import { OnpayComponent } from '../../pages/onpay/onpay.component';
import { AddproductComponent } from '../../pages/addproduct/addproduct.component';
import { YoutubePipe } from 'app/youtube.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { RegonlineComponent } from '../../pages/regonline/regonline.component';
import { ProinfoComponent } from '../../pages/proinfo/proinfo.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    NgbModule,
    MatCardModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    RegisterComponent,
    InvoiceComponent,
    TreeComponent,
    ProductsComponent,
    CompleteComponent,
    ActiveComponent,
    UsersComponent,
    NewnodComponent,
    NewtreeComponent,
    ProcessComponent,
    PointComComponent,
    MyincomeComponent,
    MyteamComponent,
    IncomeComponent,
    ExpenseComponent,
    HomeComponent,
    PinsComponent,
    OdersComponent,
    NotifyComponent,
    AddnewComponent,
    OnpayComponent,
    YoutubePipe,
    ProinfoComponent,
    RegonlineComponent,
    AddproductComponent
  ]
})

export class AdminLayoutModule { }
