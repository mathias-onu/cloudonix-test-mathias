import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProduct } from '../../interfaces/products';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-product',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  ref = inject(DynamicDialogRef)
  config = inject(DynamicDialogConfig)
  fb = inject(FormBuilder)

  product!: IProduct | null
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    cost: [0, Validators.required],
    properties: ['', Validators.required]
  })

  ngOnInit(): void {
    this.product = this.config.data.product
    this.productForm.get('name')?.setValue(this.product!.name)
    this.productForm.get('description')?.setValue(this.product!.description)
    this.productForm.get('cost')?.setValue(this.product!.cost)
  }

  closeDialog() {
    this.ref.close()
  }
}
