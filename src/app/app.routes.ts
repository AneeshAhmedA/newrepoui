import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AddRestaurantComponent } from './admin/restaurant-management/add-restaurant/add-restaurant.component';
import { GetallrestaurantComponent } from './admin/restaurant-management/getallrestaurant/getallrestaurant.component';
import { RestaurantByIdComponent } from './pages/restaurant-by-id/restaurant-by-id.component';
import { GetMenuComponent } from './pages/get-menu/get-menu.component';
import { AddMenuComponent } from './pages/add-menu/add-menu.component';
import { MenuSearchComponent } from './pages/menu-search/menu-search.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { UserListComponent } from './admin/user-management/user-list/user-list.component';
import { UserDetailsComponent } from './admin/user-management/user-details/user-details.component';
import { CityDetailsComponent } from './admin/city-management/city-details/city-details.component';
import { AddCityComponent } from './admin/city-management/add-city/add-city.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { GetResByCityComponent } from './customer/get-res-by-city/get-res-by-city.component';
import { UserDashboardComponent } from './customer/user-dashboard/user-dashboard.component';
import { ViewCartComponent } from './pages/view-cart/view-cart.component';
import { OrderByIdComponent } from './pages/order-by-id/order-by-id.component';
import { RestaurantDashboardComponent } from './restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { MenuManagementComponent } from './restaurant/menu-management/menu-management.component';
import { OrderManagementComponent } from './restaurant/order-management/order-management.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { HomeComponent } from './home/home.component';
import { UploadImgComponent } from './pages/upload/upload.component';
import { DownloadComponent } from './pages/download/download.component';
import { CitySortingComponent } from './customer/city-sorting/city-sorting.component';
import { RestaurantListComponent } from './customer/restaurant-list/restaurant-list.component';
import { RestuploadComponent } from './restupload/restupload.component';
import { MenuListComponent } from './customer/menu-list/menu-list.component';



export const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'getrestbyid/:rid', component: RestaurantByIdComponent },
  { path: 'getallmenu', component: GetMenuComponent },
  { path: 'addmenu', component: AddMenuComponent },
  { path: 'menu-search', component: MenuSearchComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  {path: 'orderbyid/:uid',component:OrderByIdComponent},
  {path:'upload',component:UploadImgComponent},
  {path:'download',component:DownloadComponent},
  {path:'city-sorting',component:CitySortingComponent},
  {path:'restaurant-list',component:RestaurantListComponent},
  {path:'upload-res',component:RestuploadComponent},
  {path:'menu-items/:rid',component:MenuListComponent},

  
    {path: 'user-dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'resbycity', component: GetResByCityComponent },
      { path: 'add-order', component: AddOrderComponent },
      { path: 'order-list', component: OrderListComponent },
      {path:'payment',component:PaymentComponent},
      { path: 'login', component: LoginComponent },
      {path:'city-sorting',component:CitySortingComponent},
      {path:'restaurant-list',component:RestaurantListComponent},
      {path:'menu-items/:rid',component:MenuListComponent},
    ]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'city-details', component: CityDetailsComponent },
      { path: 'add-city', component: AddCityComponent },
      { path: 'getallrestaurants', component: GetallrestaurantComponent },
      { path: 'addrestaurant', component: AddRestaurantComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserDetailsComponent },
      { path: 'login', component: LoginComponent },
      {path:'order-management',component:OrderManagementComponent}

    //  {path:'order',component:OrderComponent}
 
    ],
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },


  {
    path: 'restaurant-dashboard',
    component: RestaurantDashboardComponent,
    children: [
      { path: 'menu-management', component: MenuManagementComponent },
      { path: 'menu', component: GetMenuComponent },
      {path:'order-management',component:OrderManagementComponent},
      { path: 'login', component: LoginComponent },
      { path: 'addmenu', component: AddMenuComponent },
    ],
  },

];
