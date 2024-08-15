import { Component, Input } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { GroceryItem, GroceryService } from '../services/grocery.service'

@Component({
  selector: 'app-grocery-modal',
  templateUrl: './grocery-modal.page.html',
  styleUrls: ['./grocery-modal.page.scss'],
})
export class GroceryModalPage {
  // item passed to modal, index of item in list
  @Input() item!: GroceryItem
  @Input() index!: number

  name: string = ''
  quantity: number = 0

  constructor(private modalController: ModalController, private groceryService: GroceryService) { }

  // Initialize the modal with the item's details (if available)
  ngOnInit() {
    if (this.item) {
      this.name = this.item.name
      this.quantity = this.item.quantity
    }
  }

  save() {
    if (this.item && this.item._id) {
      // Update an existing item
      this.groceryService.updateGrocery(this.item._id, {
        _id: this.item._id,
        name: this.name,
        quantity: this.quantity
      }).subscribe(() => {
        this.modalController.dismiss();
      });
    } else {
      // Add a new item
      const newItem: GroceryItem = {
        _id: '',  // The backend will generate this
        name: this.name,
        quantity: this.quantity
      };
      this.groceryService.addGrocery(newItem).subscribe(() => {
        this.modalController.dismiss();
      });
    }
  }

  // close modal and do not save changes
  close() {
    this.modalController.dismiss()
  }
}