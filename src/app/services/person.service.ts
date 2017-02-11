import { Injectable } from '@angular/core';
import { Paging } from './paging';
import { Person } from './person';

@Injectable()
export class PersonService {

    getPeople(paging: Paging): Person[] {
        const firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
            lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
            cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
            titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
                "Software Developer", "Inside Sales Coordinator", "Chief Technical Officer", "Chief Execute Officer"];
        const total = 567;

        paging.total = total;
        paging.returned = (paging.skip + paging.skip > paging.total) ?
            paging.total - paging.skip :
            paging.take;

        /* Generating example data */
        return Array(paging.returned).fill({}).map((_, idx) => ({
            id: paging.skip + idx + 1,
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            title: titles[Math.floor(Math.random() * titles.length)]
          })
        );
    }

}
