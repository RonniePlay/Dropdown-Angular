import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface IOrder {
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  closeDropdown = false;
  valueCheckbox: any = "Choose a place...";
  arrowCheckbox = false;

  Order: IOrder[] = [];

  formOrder: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formOrder = this.fb.group({
      country: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.Order = [
      {name: "Poland", value: false},
      {name: "African", value: false}
    ];
  }

  onCheckboxChange(e: any) {
    const country: FormArray = this.formOrder.get('country') as FormArray;
    if (e.target.checked) {
      country.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      country.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          country.removeAt(i);
          return;
        }
        i++;
      });
    }

    if (this.formOrder.value.country.length === 0) {
      this.valueCheckbox = "Choose a place...";
    }
    if (this.formOrder.value.country.length === 1) {
      this.valueCheckbox = this.formOrder.value.country[0];
    }
    if (this.formOrder.value.country.length > 1) {
      this.valueCheckbox = this.formOrder.value.country.length + " locations selected";
    }
  }

  
  onSearchInputChange(event: any) {
    if (event.target.value != "") {
      this.Order = this.Order.filter(res => {
        return res.name.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase())
      });
    }
    else if(event.target.value == "") {
      this.ngOnInit();
    }
  }

  openDropdown() {
    if (this.closeDropdown === false) {
      this.closeDropdown = true;
      this.arrowCheckbox = true;
    }
    else {
      this.closeDropdown = false;
      this.arrowCheckbox = false;
    }
  }
}
