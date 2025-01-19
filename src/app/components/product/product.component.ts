import { Component, OnInit, inject, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEditPayload, IProduct } from '../../interfaces/products';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyValueComponent } from "../key-value/key-value.component";
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    KeyValueComponent
  ],
  providers: [MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  readonly ref = inject(DynamicDialogRef)
  readonly config = inject(DynamicDialogConfig)
  readonly fb = inject(FormBuilder)
  readonly productsService = inject(ProductsService)
  readonly messageService = inject(MessageService)

  product!: IProduct | null
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    cost: [0, Validators.required]
  })
  keyValueComponent = viewChild(KeyValueComponent)

  ngOnInit(): void {
    this.product = this.config.data.product
    this.productForm.get('name')?.setValue(this.product!.name)
    this.productForm.get('description')?.setValue(this.product!.description)
    this.productForm.get('cost')?.setValue(this.product!.cost)
  }

  closeDialog() {
    this.ref.close()
  }

  submitEdit() {
    // TODO: should create an enum for profile values and values for type

    // Iterates over the productProfileForm in KeyValueComponent to parse a product profile object ready for payload
    const profile: any = {}
    this.keyValueComponent()?.productProfileForm.value.pairs?.forEach((pair: any) => {
      console.log(pair.key.name)
      switch (pair.key.name) {
        case 'type':
          profile[pair.key.name] = pair.value.name
          break
        case 'available':
          profile[pair.key.name] = pair.value[0]
          break
        case 'backlog':
          profile[pair.key.name] = pair.value
          break
      }
    })
    
    const payload: IEditPayload = {
      name: this.productForm.get('name')?.value!,
      description: this.productForm.get('description')?.value!,
      cost: this.productForm.get('cost')?.value!,
      profile: profile
    }

    this.productsService.editProduct(this.product!.id, payload).subscribe({
      next: res => console.log(res.body),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `An error occurred while updating product ${this.product!.id}...`, life: 3000 })
    })

    this.closeDialog()
  }
}
