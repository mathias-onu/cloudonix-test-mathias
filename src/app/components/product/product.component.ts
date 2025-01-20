import { Component, OnInit, inject, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICreatePayload, IEditPayload, IProduct } from '../../interfaces/products';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyValueComponent } from "../key-value/key-value.component";
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-product',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    KeyValueComponent,
    Toast
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

  actionType!: string
  product!: IProduct | null
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    cost: [0, Validators.required],
    sku: [{ value: '', disabled: true }, Validators.required]
  })
  keyValueComponent = viewChild(KeyValueComponent)

  ngOnInit(): void {
    this.actionType = this.config.data.actionType
    if (this.actionType === 'edit') {
      this.product = this.config.data.product
      this.productForm.get('name')?.setValue(this.product!.name)
      this.productForm.get('description')?.setValue(this.product!.description)
      this.productForm.get('cost')?.setValue(this.product!.cost)
      this.productForm.get('sku')?.setValue(this.product!.sku)
    }
    else if (this.actionType === 'add') this.productForm.get('sku')?.enable()
  }

  closeDialog() {
    this.ref.close()
  }

  submit() {
    // Iterates over the productProfileForm in KeyValueComponent to parse a product profile object ready for payload
    const profile: any = {}
    const pairs = this.keyValueComponent()?.productProfileForm.value.pairs

    // If there are key-value pairs, it parses them
    if (pairs?.length !== 0) {
      pairs?.forEach((pair: any) => {
        profile[pair.key.name] = pair[pair.key.name]
        // Parses the value of the type control
        if (pair.key.name === 'type') profile[pair.key.name] = profile[pair.key.name].name
      })
    }
    const editPayload: IEditPayload = {
      name: this.productForm.get('name')?.value!,
      description: this.productForm.get('description')?.value!,
      cost: this.productForm.get('cost')?.value!,
      profile: profile
    }

    const createPayload: ICreatePayload = {
      name: this.productForm.get('name')?.value!,
      description: this.productForm.get('description')?.value!,
      sku: this.productForm.get('sku')?.value!,
      cost: this.productForm.get('cost')?.value!,
      profile: profile
    }
    
    if (this.actionType === 'edit') {
      this.productsService.editProduct(this.product!.id, editPayload).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product has been updated!', life: 3000 }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `An error occurred while updating product ${this.product!.id}...`, life: 3000 })
      })
    }
    else if (this.actionType === 'add') {
      this.productsService.createProduct(createPayload).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The product has been added!', life: 3000 }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `An error occurred while adding product ${this.product!.id}...`, life: 3000 })
      })
    }

    this.closeDialog()
  }
}
