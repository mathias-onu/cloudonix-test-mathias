import { Component, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { IProductProfile, IProfileOption } from '../../interfaces/products';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-key-value',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    InputNumberModule
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
  profileKeyOptions: IProfileOption[] = [
    { name: 'type' },
    { name: 'available' },
    { name: 'backlog' }
  ]
  typeValues: IProfileOption[] = [
    { name: 'furniture' },
    { name: 'equipment' },
    { name: 'stationary' },
    { name: 'part' }
  ]

  get pairs(): FormArray {
    return this.productProfileForm.get('pairs') as FormArray
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productProfile']) this.initializeFormArray(changes['productProfile'].currentValue || [])
  }

  initializeFormArray(profile: IProductProfile[]) {
    this.pairs.clear()

    // Populates the form array with product data
    Object.keys(profile).forEach(key => this.addNewPair(key, profile[key as keyof typeof profile]))
  }

  addNewPair(profileKey?: string, profileValue?: any) {
    // TODO: inspect the initialization of profile pairs that already exist (some are not set right)
    // TODO: if a key already exists in the pairs, shouldn't allow selection
    const newPair = this.fb.group({
      key: [profileKey ? { name: profileKey } : '', Validators.required],
      value: [profileValue ? { name: profileValue} : null as (string | number | boolean | null), Validators.required]
    })
    
    this.pairs.push(newPair)

    // Sets the value of the availability checkbox
    newPair.get('key')?.valueChanges.subscribe((key: any) => {
      if (key!.name === 'available') newPair.get('value')?.setValue(false)
    })

    newPair.get('value')?.valueChanges.subscribe(value => {
      // TODO: Doesn't apply the real value of availability
    })
  }

  deletePair($index: number) {
    this.pairs.removeAt($index)
  }
}
