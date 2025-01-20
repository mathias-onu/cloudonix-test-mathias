import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IProduct } from '../../interfaces/products';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductComponent } from '../product/product.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [
    ToastModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsService = inject(ProductsService)
  messageService = inject(MessageService)
  dialogService = inject(DialogService)
  confirmationService = inject(ConfirmationService)

  subs: Subscription[] = []

  products!: IProduct[]
  ref: DynamicDialogRef | undefined
  
  ngOnInit(): void {
    this.getProducts()
  }

  openProduct(actionType: string, i?: number) {
    // Opens the dialog of the clicked product
    this.ref = this.dialogService.open(ProductComponent, {
      data: {
        actionType: actionType,
        product: actionType === 'edit' ? this.products[i!] : null
      },
      header: 'Product information',
      width: '80vw',
      modal: true,
      contentStyle: { overflow: 'auto' }
    })

    // Updates the products list as a result of closing the dialog
    this.subs.push(this.ref.onClose.subscribe(() => this.getProducts()))
  }

  deleteProduct(i: number, event: Event) {
    // Upon delete, it opens a confirmation dialog to prevent accidental deletion
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: `Delete ${this.products[i].sku}`,
      message: 'Do you want to delete this product?',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.subs.push(this.productsService.deleteProduct(this.products[i].id).subscribe({
          next: () => {
            this.getProducts()
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Product ${this.products[i].sku} has been deleted` })
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while trying to delete the product...' })
        }))
      },
      reject: () => {}
    })
  }

  getProducts() {
    // Gets all the products
    this.subs.push(this.productsService.getProducts().subscribe({
      next: (res) => this.products = res.body!,
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while getting the products...', life: 3000 })
    }))
  }

  ngOnDestroy(): void {
    if (this.subs.length > 0) this.subs.forEach(sub => sub.unsubscribe())
  }
}
