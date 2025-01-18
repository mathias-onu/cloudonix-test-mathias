import { Component, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { IProductProfile } from '../../interfaces/products';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-key-value',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './key-value.component.html',
  styleUrl: './key-value.component.scss'
})
export class KeyValueComponent implements OnChanges {
  readonly fb = inject(FormBuilder)

  productProfile = input()

  productProfileForm = this.fb.group({
    pairs: this.fb.array([])
  })

  get pairs(): FormArray {
    return this.productProfileForm.get('pairs') as FormArray
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productProfile']) {
      console.log(changes['productProfile'].currentValue)
      this.initializeFormArray(changes['productProfile'].currentValue || [])
    }
  }

  private initializeFormArray(profile: IProductProfile[]) {
    this.pairs.clear()

    // Populates the form array with product data
    Object.keys(profile).forEach(key => {
      this.pairs.push(this.fb.group({
        key: [{ value: key, disabled: true }],
        value: [profile[key as keyof typeof profile]]
      }))
    })
  }

  addNewPair() {
    this.pairs.push(this.fb.group({
      key: [{ value: '', disabled: true }],
      value: ['']
    }))
  }

  deletePair($index: number) {
    this.pairs.controls.splice($index, 1)
  }
}
