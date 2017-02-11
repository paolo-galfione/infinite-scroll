import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-root',
  template: `
      <kendo-grid
          [data]="gridView"
          [skip]="skip"
          [pageSize]="pageSize"
          [scrollable]="'virtual'"
          [rowHeight]="36"
          [height]="300"
          (pageChange)="pageChange($event)"
        >
        <kendo-grid-column field="id" [width]="80" title="ID"></kendo-grid-column>
        <kendo-grid-column field="firstName" title="First Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="lastName" title="Last Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="city" title="City" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="title" title="Title"></kendo-grid-column>
      </kendo-grid>
  `
})
export class AppComponent {
    private gridView: GridDataResult;
    private data: any[];
    private pageSize: number = 100;
    private skip: number = 0;

    constructor() {
        this.data = this.createRandomData(100000);
        this.loadProducts();
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: this.data.slice(this.skip, this.skip + this.pageSize),
            total: this.data.length
        };
    }

    /* Generating example data */
    private createRandomData(count: number) {
        const firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
            lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
            cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
            titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
            "Software Developer", "Inside Sales Coordinator", "Chief Technical Officer", "Chief Execute Officer"];

        return Array(count).fill({}).map((_, idx) => ({
                id: idx + 1,
                firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
                lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
                city: cities[Math.floor(Math.random() * cities.length)],
                title: titles[Math.floor(Math.random() * titles.length)]
            })
        );
    }
}