import { Component, Input } from '@angular/core';
import { HOBBIES } from './Hobbies.model';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent {
  showHobbies: boolean = false;
  @Input() selectedHobbies: string = ' ';
  hobbies: any[] = [];

  constructor() {}


  ngOnInit() {
    this.hobbies = HOBBIES;
  }

  checkedHobbies(hobby: any) {
    
  }
}
