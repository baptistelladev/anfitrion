import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'rgs-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent  implements OnInit {

  @Input() color: string = 'gray-text';

  public currentYear: number = moment().year();
  public yearOfCreation: number;

  constructor() { }

  ngOnInit() {}

}
