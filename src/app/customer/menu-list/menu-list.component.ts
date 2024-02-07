import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
import { Res } from '../../Models/res';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDTO } from '../../Models/order-dto';
import { Order } from '../../Models/order';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  imports: [FormsModule, CommonModule,HttpClientModule],
})
export class MenuListComponent implements OnInit {
  rid?: number;
  rname?: string;
  selectedRestaurant: Res;
  filteredMenuItems: Menuitem[] = [];
  orderItems: OrderDTO[] = [];
  orderItem:OrderDTO ;
  userId: string | null = null;
  quantityOptions: number[] = [1, 2, 3]; // Include 0 as an option

  order:boolean=true;

  orderPlacementSuccess: boolean = false;
  menuItem:any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderItem=new OrderDTO();
    this.route.params.subscribe((p) => (this.rid = p['rid']));
    this.selectedRestaurant = new Res();
    this.http
      .get<Res>('http://localhost:5145/api/Restaurant/' + this.rid)
      .subscribe((response) => {
        console.log(response)
        this.selectedRestaurant = response;
        this.rname = this.selectedRestaurant.name;
        this.getFilteredMenuItems();
      });

    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
  }

  getFilteredMenuItems() {
    if (this.selectedRestaurant) {
      this.http
        .get<Menuitem[]>(
          `http://localhost:5145/api/MenuItem/ByRestaurant/${encodeURIComponent(
            this.rname || ''
          )}`
        )
        .subscribe(
          (response) => {
            console.log(response)
            this.filteredMenuItems = response.map((menuItem) => ({
              id:menuItem.menuItemId,
              name: menuItem.name,
              description: menuItem.description,
              price: menuItem.price,
              quantity: 1,
              image: menuItem.image
            }));
          },
          (error) => {
            console.error(
              'Error fetching menu items by restaurant from API',
              error
            );
          }
        );
    }
  }

  getRestaurantImage(m: string) {
    return `http://localhost:5145/Resources/Images/${m}`;
  }

  addToOrder(MenuItem: Menuitem) {
    this.menuItem = MenuItem;
    let orderID: number;
    const userId = localStorage.getItem('userId');
    
    // Prepare order data
    const orderData = {
      userId: userId,
      restaurantId: this.selectedRestaurant?.restaurantId,
      menuItemId: this.menuItem.id,
      orderDate: new Date(),
      quantity: this.menuItem.quantity,
      totalPrice: this.menuItem.quantity * this.menuItem.price,
    };

    // Send order data to the server
    this.http.post('http://localhost:5145/api/Order', orderData).subscribe(
      (response: any) => {
        orderID = response;
        // Create a copy of the menu item and assign order ID
        const menuItemCopy: Menuitem = {
          ...this.menuItem,
          orderId: orderID
        };
        menuItemCopy.price=orderData.totalPrice;
        // Add the copied menu item to the order
        this.orderItems.push(menuItemCopy);
        
        console.log('Order placed successfully:', response);
        this.orderPlacementSuccess = true;
        setTimeout(() => {
          this.orderPlacementSuccess = false;
          // Redirect to the order list page
          // this.router.navigate(['user-dashboard', 'order-list']);
        }, 50);
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
    console.log(this.orderItems);
    // Reset the quantity of the original menu item to its default value
   // this.menuItem.quantity = 1;
   this.calculateTotalOrderPrice();
}


  removeItemFromOrder(orderId: any) {
      const index = this.orderItems.findIndex(item => item.orderId === orderId);
      if (index !== -1) {
        this.http.delete('http://localhost:5145/api/Order/' + orderId).subscribe(
          (response: any) => {
            this.orderItems.splice(index, 1);
            console.log('Order item deleted successfully');
          },
          (error) => {
            console.error('Error deleting order item', error);
          }
        );
      } else {
        console.error('Order item not found in the list');
      }
    }
    
    submitOrder() {   
      this.order=false;
      console.log(this.orderItems)
    // this.router.navigate(['user-dashboard/pay']);
}
placeOrder(){
  this.router.navigate(['user-dashboard/pay']);
}
  calculateTotalOrderPrice(): number {
  let totalPrice = 0;
  for (let orderItem of this.orderItems) {
    if (orderItem.price !== undefined) {
      totalPrice += orderItem.price;
    }
  }
  return totalPrice;
}


  increaseQuantity(menuItem: Menuitem) {
    menuItem.quantity++;
  }

  decreaseQuantity(menuItem: Menuitem) {
    if (menuItem.quantity > 1) {
      menuItem.quantity--;
    }
  }
}
