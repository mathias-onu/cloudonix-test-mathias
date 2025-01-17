import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IProduct } from '../../interfaces/products';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-products',
  imports: [
    ToastModule,
    TableModule,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductsService)
  messageService = inject(MessageService)

  products!: IProduct[]
  
  ngOnInit(): void {
    // Gets all the products
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.body!
        console.log(res.body!.length)
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while getting the products...', life: 3000 })
    })
  }
}
