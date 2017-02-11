import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { PersonService } from './services/person.service';
import { Paging } from './services/paging';
import { Person } from './services/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    private gridView: GridDataResult;
    private paging: Paging;

    constructor(private personService: PersonService) {
        this.paging = { skip:0, take: 50, total:0, returned:0 };
        this.loadPersons();
    }

    protected pageChange(event: PageChangeEvent): void {
        this.paging.skip = event.skip;
        this.loadPersons();
    }

    private loadPersons(): void { 
        this.personService.getHttpPeopleFake(this.paging).subscribe(
            (persons: Person[]) => {
                this.gridView = {
                    data: persons,
                    total: this.paging.total
                }
            }
        );
    }

}