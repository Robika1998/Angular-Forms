import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface IsalesTaxArray {
  id: number,
  title: string,
  value: number
}

interface items {
  id: number,
  name:string,
  items: [{
    id: number,
    name: string,
    glCode: number,
    amount: number,
    salesTax: IsalesTaxArray;
  }];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  itemsTitles = [
    'Category',
    'Items',
    'GL Code',
    'Amount',
    'Sales Tax',
    'Total'
  ]

  localItems: items[] = [
    {
      id:1,
      name: 'Category 1',
      items: [{
        id: 1,
        name: 'Item 1',
        glCode: 0,
        amount: 0,
        salesTax: {id: 0, title: '', value: 0},
      }]
    }
  ];

  salesTaxArray: IsalesTaxArray[] = [
    {id: 1, title: 'No Tax', value: 0},
    {id: 2, title: 'Georgia', value: 10},
    {id: 3, title: 'Germany', value: 20},
  ];

  ngOnInit() {
    this.localItems[0].items[0].salesTax = this.salesTaxArray[0];
  }

  submitForm(myForm: NgForm) {
     console.log(myForm);
     
  }
}
