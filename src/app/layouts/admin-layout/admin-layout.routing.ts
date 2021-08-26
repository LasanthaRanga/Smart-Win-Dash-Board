import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { TreeComponent } from '../../pages/tree/tree.component';
import { ProductsComponent } from '../../pages/products/products.component';
import { InvoiceComponent } from '../../pages/invoice/invoice.component';
import { CompleteComponent } from '../../pages/complete/complete.component';
import { ActiveComponent } from '../../pages/active/active.component';
import { NewtreeComponent } from '../../pages/newtree/newtree.component';
import { UsersComponent } from '../../pages/users/users.component';
import { NewnodComponent } from '../../pages/newnod/newnod.component';
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
import { ProinfoComponent } from '../../pages/proinfo/proinfo.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'user-profile/:id', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tree', component: TreeComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'complete/:id', component: CompleteComponent },
    { path: 'active', component: ActiveComponent },
    { path: 'newtree', component: NewtreeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'newnod', component: NewnodComponent },
    { path: 'process', component: ProcessComponent },
    { path: 'pointcom/:id', component: PointComComponent },
    { path: 'myincome', component: MyincomeComponent },
    { path: 'myteam', component: MyteamComponent },
    { path: 'income', component: IncomeComponent },
    { path: 'expenses', component: ExpenseComponent },
    { path: 'home', component: HomeComponent },
    { path: 'pins', component: PinsComponent },
    { path: 'oder/:id', component: OdersComponent },
    { path: 'notify', component: NotifyComponent },
    { path: 'addnew/:id', component: AddnewComponent },
    { path: 'onpay', component: OnpayComponent },
    { path: 'addproduct', component: AddproductComponent },
    { path: 'proinfo',component:ProinfoComponent},
    { path: 'proinfo/:id',component:ProinfoComponent},

];