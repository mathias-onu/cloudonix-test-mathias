import { Component, OnChanges, OnDestroy, SimpleChanges, inject, input } from '@angular/core';
import { IProductProfile, IProfileOption } from '../../interfaces/products';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-key-value',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    InputNumberModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './key-value.component.html',
  styleUrl: './key-value.component.scss'
})
export class KeyValueComponent implements OnChanges, OnDestroy {
  readonly fb = inject(FormBuilder)
  readonly messageService = inject(MessageService)

  subs: Subscription[] = []

  productProfile = input()
  actionType = input()

  actionTypeValue!: string
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
  completeProfile: boolean = false

  get pairs(): FormArray {
    return this.productProfileForm.get('pairs') as FormArray
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productProfile'] || changes['actionType']) {
      this.actionTypeValue = changes['actionType'].currentValue
      this.initializeFormArray(changes['productProfile'].currentValue || [])
    }
  }

  initializeFormArray(profile: IProductProfile) {
    this.pairs.clear()

    // Prevents adding key-value pairs if all of them are already present
    if (profile.type && profile.available && profile.backlog) this.completeProfile = true

    // Populates the form array with product data
    if (this.actionTypeValue === 'edit') Object.keys(profile).forEach(key => this.addNewPair(key, profile[key as keyof typeof profile]))
  }

  addNewPair(profileKey?: string, profileValue?: any) {
    const newPair = this.fb.group({
      key: [profileKey ? { name: profileKey } : '', Validators.required],
      type: [{ name: 'furniture' }],
      available: [true],
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

    // Prevents the user from adding duplicate keys
    this.subs.push(newPair.get('key')!.valueChanges.subscribe((key: any) => {
      const foundDuplicateKey = this.pairs.controls.some((pair, i) => {
        if (pair.get('key')?.value.name === key!.name && i < this.pairs.controls.length - 1) return true
        else return false
      })

      if (this.pairs.controls.length > 0 && foundDuplicateKey) {
        this.deletePair(this.pairs.controls.length - 1)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You are trying to add an existing key - please try another one.', life: 6000 })
      }
    }))
    
    this.pairs.push(newPair)

    // Disables the add new pair btn if profile is complete
    if (this.pairs.controls.length === 3) this.completeProfile = true
  }

  deletePair($index: number) {
    this.pairs.removeAt($index)
    this.completeProfile = false
  }

  ngOnDestroy(): void {
    if (this.subs.length > 0) this.subs.forEach(sub => sub.unsubscribe())
  }
}
