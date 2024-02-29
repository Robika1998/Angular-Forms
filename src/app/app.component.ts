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

  totalAmount: number = 0;
  totalTaxes: number = 0;

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
     console.log(this.localItems);
     
     
  }

  addCategory() {
     this.localItems.push(
      {
        id: -(new Date().getTime()),
        name: 'Category',
        items: [{
          id: -(new Date().getTime()),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: {id: 0, title: '', value: 0},
        }]
      }
     );
  }

  removeCategory(id: number) {
    const idx = this.localItems.findIndex((item) => item.id === id)
    if (idx !== -1) {
      this.localItems.splice(idx, 1)
    }
  }

  addItemToCategory(id: number) {
     this.localItems.find((item) => {
      if (item.id === id) {
        item.items.push({
          id: -(new Date().getTime()),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: {id: 0, title: '', value: 0},
        });
      }
     });
  }

  removeItemFromCategory(catId: number, itemId: number) {
    this.localItems.find((item) => {
      const idx = item['items'].findIndex((item) => item.id === itemId);
      if (idx !== -1) {
        item['items'].splice(idx, 1)
      }
    })

}

getTotalAmount(isAmount: boolean) {
  let total = 0;

  this.localItems.forEach((item) => {
    total = item.items.reduce((acc, curr) => {
      if (isAmount) {
        return acc + +curr.amount;
      }
      return acc + +curr.salesTax.value;
    }, total);
  });

  if (isAmount) this.totalAmount = total;
  else this.totalTaxes = total;
}

}

