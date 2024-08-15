import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroceryItem, GroceryService } from '../services/grocery.service';
import { GroceryModalPage } from '../grocery-modal/grocery-modal.page';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  groceries: GroceryItem[] = [];

  constructor(private groceryService: GroceryService, private modalController: ModalController) { }
  
  // load list of groceries when component initialized
  ngOnInit() {
    this.loadGroceries();
  }

  // get groceries from backend service
  loadGroceries() {
    this.groceryService.getGroceries().subscribe(
      (data: GroceryItem[]) => {
        this.groceries = data;
      },
      (error) => {
        console.error('Error loading groceries:', error);
      }
    );
  }

  //important for returning to page, refreshing etc.
  ionViewWillEnter() {
    this.loadGroceries();
  }

  async openModal(item?: GroceryItem) {
    const modal = await this.modalController.create({
      component: GroceryModalPage,
      componentProps: { item }
    });
    // update view with changes
    modal.onDidDismiss().then(() => {
      this.loadGroceries();
    });
    return await modal.present();
  }

  deleteGrocery(id: string) {
    this.groceryService.deleteGrocery(id).subscribe(
        () => {
            console.log("Grocery deleted successfully");
            // update view with changes
            this.loadGroceries();
        },
        (error) => {
            console.error("Error deleting grocery:", error);
        }
    );
  }

  async shareGroceryItem(item: GroceryItem) {
    await Share.share({
      title: 'Grocery Item',
      text: `${item.name} (Quantity: ${item.quantity})`,
      dialogTitle: 'Share this item'
    });
  }
}