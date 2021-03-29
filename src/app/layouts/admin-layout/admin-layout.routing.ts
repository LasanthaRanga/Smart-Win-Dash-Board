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

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
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


];
