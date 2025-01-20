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
    // TODO: if a key already exists in the pairs, shouldn't allow selection
    
    const newPair = this.fb.group({
      key: [profileKey ? { name: profileKey } : '', Validators.required],
      type: [{ name: '' }],
      available: [false],
      backlog: [0]
    })
    switch (profileKey) {
      case 'type':
          newPair.get('type')?.setValue({ name: profileValue })
          break
      case 'available':
        newPair.get('available')?.setValue(profileValue)
        break
      case 'backlog':
        newPair.get('backlog')?.setValue(profileValue)
        break
    }
    
    this.pairs.push(newPair)
  }

  deletePair($index: number) {
    this.pairs.removeAt($index)
  }
}
